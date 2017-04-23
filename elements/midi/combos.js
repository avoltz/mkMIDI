import MidiWidget from './midiwidget';
import Section from '../section';

export default class Combo extends MidiWidget {
  constructor(controller, combo, el) {
    super(controller, combo);
    let container = document.createElement("div");
    container.style.display = 'inline-block';
    container.className = 'combo';
    if (typeof(title) != 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = combo.title;
      container.appendChild(new_lbl);
    }
    this.container = container;
    this.create(combo.labels, combo.values);
    el.appendChild(this.container);
  }

  clear() {
    if (this.container.childNodes.length > 0) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  create(labels, values) {
    this.clear();
    if (labels.length != values.length) {
      console.log('Combo: len of labels != values');
    }
    let new_el = document.createElement("select");
    let i = 0;

    labels.forEach(label => {
      let op = document.createElement("option");
      op.innerHTML = label;
      op.value = values[i++];
      new_el.appendChild(op);
    });
    let self = this;
    new_el.onchange = function() {
      self.model_object.value = self.value = new_el.options[new_el.selectedIndex].value;
      self.send_update();
    };
    this.container.appendChild(new_el);
    this.element = new_el;
  }

  update(value) {
    this.element.options.forEach(o => {
      o.selected = o.value === value;
    });
    this.model_object.value = this.value = value;
  }
}

Section.add_class('combo', Combo);
