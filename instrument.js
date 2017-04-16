import IOSelect from 'io';
import MidiControl from 'midictl';

// this is a ui class really
export class Instrument {
  constructor(el, model) {
    let synth_el = document.createElement("div");
    el.style.display = 'none'; // hide for now
    this.name = model.name;
    this.io_select = new IOSelect(synth_el, { inputs: [], outputs: [] });
    this.midi_control = new MidiControl(this);
    // create the widgets, flat model
    this.sections = [];
    model.sections.forEach(section => {
      let s = new Section(el, section);
    });
    el.appendChild(synth_el);
    el.style.display = 'block'; // hide for now
  }
}
