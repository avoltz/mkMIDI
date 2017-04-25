import MidiWidget from './midiwidget';
import Section from '../section';

/*
  Sliders are used essentially instead of knobs, because knobs kind of suck
  on the web / tiny screens.

  There are a few special model params:

  title:     - (optional) a name to display

  max: <int> - Maximum value
  min: <int> - (optional) Minimum value (display current value minus this)
               default 0
*/
export class Slider extends MidiWidget {
  constructor(constructor, slider, el) {
    super(constructor, slider);
    if (typeof(slider.min) === 'undefined') {
      this.min = 0;
    } else {
      this.min = slider.min;
    }
    this.value = 0;
    this.max = slider.max;
    let container = document.createElement("div");
    container.className = 'slider';
    if (typeof(slider.title) !== 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = slider.title;
      container.appendChild(new_lbl);
    }
    let new_el = document.createElement("input");
    new_el.type = "range";
    new_el.min = 0;
    new_el.max = (this.min > 0) ? slider.max - this.min : slider.max;
    new_el.value = this.value;
    this.value_el = document.createElement("label");
    this.value_el.innerHTML = this.value;
    container.appendChild(new_el);
    container.appendChild(this.value_el);
    el.appendChild(container);
    let self = this;
    new_el.onchange = function() {
      self.value_el.innerHTML = new_el.value;
      self.value = parseInt(new_el.value) + self.min;
      self.send_update();
    };
    this.element = new_el;
  }

  update(value) {
    if (value >= this.min && value <= this.max) {
      this.element.disabled = false;
      this.element.value = value - this.min;;
      this.value_el.innerHTML = this.element.value;
      this.value = value;
    } else {
      this.element.disabled = true;
    }
  }
}

Section.add_class('slider', Slider);
