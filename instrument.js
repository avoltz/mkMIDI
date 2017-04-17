import Section from './elements/section';
import IOSelect from './elements/io';
import ADSRView from './elements/midi/adsr';
import { Button, LabelButton, GroupButton, TriangleButton, SquareButton, SawtoothButton } from './elements/midi/buttons';
import Combo from './elements/midi/combos';
import Slider from './elements/midi/slider';
import MidiControl from './lib/midicontrol';

export class Instrument {
  constructor(el, model) {
    let synth_el = document.createElement("div");
    el.style.display = 'none'; // hide for now
    this.name = model.name;
    this.midi_control = new MidiControl(this);
    this.io_select = new IOSelect(synth_el, { inputs: [], outputs: [] });
    // create the widgets, flat model
    this.sections = [];
    model.sections.forEach(section => {
      let s = new Section(el, section);
    });
    el.appendChild(synth_el);
    el.style.display = 'block'; // hide for now
  }
}

export default { Instrument };
