/* this is a closed class used to own the midi access */
class MidiInterfaceManager {
  constructor() {
    this.controllers = {};
    this.next_controller = 0;
    let midi_failed = function(midiAccess) {
      console.log('MIDI access denied');
    };
    navigator.requestMIDIAccess({sysex: true}).then(this.setup_midi, midi_failed);
  }

  setup_midi(midiAccess) {
    // setup the midi event handlers
    midiAccess.onstatechange = this.midi_state_change;
    midiAccess.onmidimessage = this.midi_message_handler;
    // setup a timer for syncing with controllers
    this.midi_timer = setInterval(this.midi_timer_handler, 100);
    this.midiAccess = midiAccess;
  }

  /* sync controllers with the midi data.
     for each controller c:
        get the params from c
        update params read from c's input
        send  params read from c on c's output */
  midi_timer_handler() {
    for (var i=0; i<this.next_controller; i++) {
      var ctl = this.controllers[i];
    }
  }

  midi_state_change(evt) {
  }

  /* read the message, determine the controller, and stash it in the data */
  midi_message_handler(evt) {
    console.log(`rx: ${evt.data.length}  bytes`);
    /* parse message into requisite stuff */
  }

  register_controller(controller) {
    this.controllers[this.next_controller++] = controller;
  }
}

const manager = new MidiInterfaceManager();

/* MidiControl tracks midi params bound to widgets */
// it cannot have direct access to i/o
export class MidiControl {
  // preferred is the preferred interface, currently unimplemented
  constructor(instrument) {
    this.all_widgets = []; // every known widget
    this.dirty_widgets = {};
    this.cc_widgets = {};
    this.nrpn_widgets = {};
    this.instrument = instrument;
    this.input = None;
    this.output = None;
    manager.register_controller(this);
  }

  bind(widget) {
    this.all_widgets.push(widget);
  }

  dirty(widget) {
    this.dirty_widgets.push(widget);
  }

  /* purge the cache and repopulate by walking all widgets */
  update_cache(widget) {
    this.cc_widgets = {};
    this.nrpn_widgets = {};
    this.cc_values = {};
    this.nrpn_values = {};
    this.all_widgets.forEach(w => {
      let params = w.params;
      params.forEach(p => {
        if (p.cc !== undefined) {
          this.cc_widgets[p.cc] = w;
        }
        if (p.nrpn !== undefined) {
          this.nrpn_widgets[p.nrpn] = w;
        }
      });
    });
  }
}
