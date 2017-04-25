import IOSelect from '../elements/io';
import { send_nrpn_value, send_cc_value } from './midi';

/* this is a closed class used to own the midi access */
class MidiInterfaceManager {
  constructor() {
    // map of ports to controllers, for routing messages
    this.controllers = {};
    this.next_controller = 0;

    let midi_failed = function(midiAccess) {
      console.log('MIDI access denied');
    };
    this.midi_promise = navigator.requestMIDIAccess({sysex: true}).then(midi_success, midi_failed);
  }

  setup_midi(midiAccess) {
    // setup the midi event handlers
    let self = this;
    midiAccess.onstatechange = function() {
      for (let c in self.controllers) {
        self.controllers[c].io_select.update(midiAccess);
      }
    };
    this.midiAccess = midiAccess;
  }

  // setup/swich port a controller is using
  setup_controller(controller, old_port) {
    if (typeof(this.controllers[old_port]) !== 'undefined') {
      delete this.controllers[old_port];
    }
    this.controllers[controller.port] = controller;
    this.midi_promise.then(function(midiAccess) { controller.io_select.update(midiAccess); });
  }
}

const manager = new MidiInterfaceManager();

function midi_success(midiAccess) {
  manager.setup_midi(midiAccess);
  return midiAccess;
}

function handle_midi_message(controller, evt) {
  console.log(`rx: ${evt.data.length} bytes`);
}

/* MidiControl tracks midi params bound to widgets, updates are sent
   frame the interface manager when a cc or nrpn is changed */
export default class MidiControl {
  // preferred is the preferred interface, currently unimplemented
  constructor(instrument, element) {
    // these are hashes to of the number to a set of widgets we should update
    this.cc_widgets = new Map();
    this.nrpn_widgets = new Map();
    this.instrument = instrument;
    this.input = null;
    this.output = null;
    this.channel = 0; // display as channel 1 (of 12);
    this.io_select = new IOSelect(this, element);
    manager.setup_controller(this);
  }

  set_input(input) {
    // setup input event handler
    let self = this;
    console.log(`setting onmidimessage on ${input}`);
    input.onmidimessage = function(evt) {
      handle_midi_message(self, evt);
    };
    // detach event handler from old input
    if (this.input !== null) {
      this.input.onmidimessage = undefined;
    }
    // setup our new references
    this.input = input;
  }

  set_output(output) {
    this.output = output;
  }

  add_to_map_set(map, param, widget) {
    if (! map.has(param)) {
      map.set(param, new Set([widget]));
    } else {
      map.get(param).add(widget);
    }
  }

  add_cc_widget(cc, widget) {
    this.add_to_map_set(this.cc_widgets, cc, widget);
  }

  add_nrpn_widget(nrpn, widget) {
    this.add_to_map_set(this.nrpn_widgets, nrpn, widget);
  }

  bind_widget(midi_widget) {
    // perhaps there should be a priority here? a preference of cc over
    // nrpn or something
    if (typeof(midi_widget.cc) !== 'undefined') {
      this.add_cc_widget(midi_widget.cc, midi_widget);
    }
    if (typeof(midi_widget.nrpn) !== 'undefined') {
      this.add_nrpn_widget(midi_widget.nrpn, midi_widget);
    }
  }

  // remove the widgets callbacks, etc... so a widget can unbind, change, bind.
  unbind_widget(midi_widget) {
    if (typeof(midi_widget.cc) !== 'undefined') {
      this.cc_widgets[midi_widget.cc].delete(midi_widget);
    }
    if (typeof(midi_widget.nrpn) !== 'undefined') {
      this.nrpn_widgets[midi_widget.nrpn].delete(midi_widget);
    }
  }

  widget_updated(midi_widget) {
    // perhaps there should be a priority here? a preference of cc over
    // nrpn or something
    let widget_set = null;
    if (typeof(midi_widget.cc) !== 'undefined') {
      if (this.output !== null) {
        send_cc_value(this.output, midi_widget.cc, midi_widget.value);
      } else {
        console.log(`${midi_widget.name} set CC param ${midi_widget.cc} to ${midi_widget.value}`);
      }
      widget_set = new Set(this.cc_widgets.get(midi_widget.cc));
    }
    if (typeof(midi_widget.nrpn) !== 'undefined') {
      if (this.output !== null) {
        send_nrpn_value(this.output, midi_widget.nrpn, midi_widget.value);
      } else {
        console.log(`${midi_widget.name} set NRPN param ${midi_widget.nrpn} to ${midi_widget.value}`);
      }
      widget_set = new Set(this.nrpn_widgets.get(midi_widget.nrpn));
    }
    // update every other widget which shares that param
    widget_set.delete(midi_widget);
    this.update_widget_set(widget_set, parseInt(midi_widget.value));
  }

  update_widget_set(set, value) {
    set.forEach(function(v, k, s) {
      k.update(value);
    });
  }

  updated_cc(cc, value) {
    if (this.cc_widgets.has(cc)) {
      this.update_widget_set(this.cc_widgets[cc], value);
    }
  }

  updated_nrpn(nrpn, value) {
    if (this.nrpn_widgets.has(nrpn)) {
      this.update_widget_set(this.nrpn_widgets[nrpn], value);
    }
  }
}
