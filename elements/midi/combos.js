import MidiWidget from './midiwidget';
import Section from '../section';

export default class Combo extends MidiWidget {
  constructor(el, labels, values, title) {
    super();
    let container = document.createElement("div");
    container.style.display = 'inline-block';
    container.className = 'combo';
    if (typeof(title) != 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = title;
      container.appendChild(new_lbl);
    }
    this.container = container;
    this.update(labels, values);
    el.appendChild(this.container);
  }

  clear() {
    if (this.container.childNodes.length > 0) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  update(labels, values) {
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
    this.container.appendChild(new_el);
    this.element = new_el;
  }
}

Section.add_class('combo', Combo, ['labels', 'values', 'title']);
