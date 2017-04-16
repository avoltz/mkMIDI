// uses combos
export class IOSelect {
  constructor(el) {
    this.element = document.createElement("div");
    this.element.className = 'io-select';
    let name = document.createElement("span");
    name.innerHTML = "I/O Select";
    this.element.appendChild(name);
    this.input_combo = new Combo(this.element, [], []);
    this.output_combo = new Combo(this.element, [], []);
    el.appendChild(this.element);
  }

  _createIO(collection) {
    let ops = [];
    let labels = [];
    collection.forEach(i => {
      ops.push(i.id);
      labels.push(i.name);
    });
    return { labels : labels, options : ops };
  }

  update(midiAccess) {
    let inputs = this._createIO(midiAccess.inputs);
    let outputs = this._createIO(midiAccess.outputs);
    if (inputs.length === 0) {
      this.input_combo.clear();
    } else {
      this.input_combo.update(inputs.labels, inputs.options);
    }
    if (outputs.length === 0) {
      this.output_combo.clear();
    } else {
      this.output_combo.update(outputs.labels, outputs.options);
    }
  }
}
