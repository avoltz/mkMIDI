import MidiWidget from './midiwidget';
import Section from '../section';


// probably need to add a model param to each widget.. this way we can grab
// params from there.
export class Slider extends MidiWidget {
  constructor(constructor, slider, el) {
    super(constructor, slider);
    this.min = typeof(slider.min) !== 'undefined' ? slider.min : 0;
    this.max = slider.max;
    this.value = this.min;
    let container = document.createElement("div");
    container.className = 'slider';
    if (typeof(slider.title) !== 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = slider.title;
      container.appendChild(new_lbl);
    }
    let new_el = document.createElement("input");
    new_el.type = "range";
    new_el.min = this.min; // always set above
    new_el.max = slider.max; // must always be set in model
    new_el.value = this.value;
    this.value_el = document.createElement("label");
    this.value_el.innerHTML = this.value;
    container.appendChild(new_el);
    container.appendChild(this.value_el);
    el.appendChild(container);
    let self = this;
    new_el.onchange = function() {
      self.value_el.innerHTML = self.value = new_el.value;
      self.send_update();
    };
    this.element = new_el;
  }

  update(value) {
    if (value >= this.element.min && value <= this.element.max) {
      this.element.disabled = false;
      this.value_el.innerHTML = this.element.value = this.value = value;
    } else {
      this.element.disabled = true;
    }
  }
}

Section.add_class('slider', Slider);
