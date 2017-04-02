// uses combos
class IOSelect {
  constructor(el) {
    this.element = document.createElement("div");
    this.element.className = 'io-select';
    let name = document.createElement("span");
    name.innerHTML = "I/O Select";
    this.element.appendChild(name);
    this._midiAccess = { inputs: [], outputs: [] };
    this.update_io();
    this.input_combo = new Combo(this.element, this.inputs.labels, this.inputs.options);
    this.output_combo = new Combo(this.element, this.inputs.labels,this.outputs.options);
    el.appendChild(this.element);
  }

  set midiAccess(m) { this._midiAccess = m; }

  _createIO(collection) {
    let ops = [];
    let labels = [];
    collection.forEach(i => {
      ops.append(collection[i].id);
      labels.append(collection[i].name);
    });
    return { labels : labels, options : ops };
  }

  update() {
    if (this.inputs.length === 0) {
      this.input_combo.clear();
    } else {
      this.input_combo.update(this.inputs.labels, this.inputs.options);
    }
    if (this.outputs.length === 0) {
      this.output_combo.clear();
    } else {
      this.output_combo.update(this.outputs.labels, this.outputs.options);
    }
  }

  update_io() {
    this.inputs = this._createIO(this._midiAccess.inputs);
    this.outputs = this._createIO(this._midiAccess.outputs);
  }
}
