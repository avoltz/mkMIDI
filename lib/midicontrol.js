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
    midiAccess.onmidimessage = this.midi_message_handler;
    this.midiAccess = midiAccess;
  }

  /* read the message, determine the controller, and stash it in the data */
  midi_message_handler(evt) {
    console.log(`rx: ${evt.data.length}  bytes`);
    /* parse message into requisite stuff */
    // route the control messages by port to the appropriate controller
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
let midi_access = undefined;

function midi_success(midiAccess) {
  manager.setup_midi(midiAccess);
  return midiAccess;
}

/* MidiControl tracks midi params bound to widgets, updates are sent
   frame the interface manager when a cc or nrpn is changed */
export default class MidiControl {
  // preferred is the preferred interface, currently unimplemented
  constructor(instrument, element) {
    // these are hashes of the number to the function we should call to
    // update the appropriate object
    this.cc_widgets = {};
    this.nrpn_widgets = {};
    this.instrument = instrument;
    this.input = null;
    this.output = null;
    this.channel = 0; // display as channel 1 (of 12);
    this.io_select = new IOSelect(this, element);
    manager.setup_controller(this);
  }

  setup_io(input, output) {
    this.input = input;
    this.output = output;
  }

  bind_widget(midi_widget) {
    // perhaps there should be a priority here? a preference of cc over
    // nrpn or something
    if (typeof(midi_widget.cc) !== 'undefined') {
      this.cc_widgets[midi_widget.cc] = midi_widget;
    }
    if (typeof(midi_widget.nrpn) !== 'undefined') {
      this.nrpn_widgets[midi_widget.nrpn] = midi_widget;
    }
  }

  // remove the widgets callbacks, etc... so a widget can unbind, change, bind.
  unbind_widget(midi_widget) {
    if (typeof(midi_widget.cc) !== 'undefined') {
      delete this.cc_widgets[midi_widget.cc];
    }
    if (typeof(midi_widget.nrpn) !== 'undefined') {
      delete this.nrpn_widgets[midi_widget.nrpn];
    }
  }

  widget_updated(midi_widget) {
    // perhaps there should be a priority here? a preference of cc over
    // nrpn or something
    if (typeof(midi_widget.cc) !== 'undefined') {
      send_cc_value(this.output, midi_widget.cc, midi_widget.value);
    }
    if (typeof(midi_widget.nrpn) !== 'undefined') {
      send_nrpn_value(this.output, midi_widget.nrpn, midi_widget.value);
    }
  }

  updated_cc(cc, value) {
    this.cc_callback[cc](value);
  }

  updated_nrpn(nrpn, value) {
    this.nrpn_callback[nrpn](value);
  }
}
