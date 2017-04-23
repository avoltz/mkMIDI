import MidiWidget from './midiwidget';
import Section from '../section';


// probably need to add a model param to each widget.. this way we can grab
// params from there.
export class Slider extends MidiWidget {
  constructor(constructor, slider, el) {
    super(constructor, slider);
    this.value = 0;
    let container = document.createElement("div");
    container.className = 'slider';
    if (typeof(slider.title) !== 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = slider.title;
      container.appendChild(new_lbl);
    }
    let new_el = document.createElement("input");
    new_el.type = "range";
    new_el.value = this.value;
    let value_el = document.createElement("label");
    value_el.innerHTML = this.value;
    container.appendChild(new_el);
    container.appendChild(value_el);
    el.appendChild(container);
    new_el.onchange = this.send_update;
    this.element = new_el;
  }

  update(value) {
    this.element.value = value;
  }
}

Section.add_class('slider', Slider);
