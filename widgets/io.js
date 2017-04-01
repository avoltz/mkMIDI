// uses combos
class IOSelect extends Section {
  constructor(el, midiAccess) {
    super(el, { name : null, widgets : [] });
    this.midiAccess = midiAccess;
    this.update_io();
    this.input_combo = new Combo(this.element, this.inputs.labels, this.inputs.options);
    this.output_combo = new Combo(this.element, this.inputs.labels,this.outputs.options);
    // override the Section class for the container div
    this.element.parentNode.className = 'io-select';
  }

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
    if (this.inputs.length == 0) {
      this.input_combo.clear();
    } else {
      this.input_combo.update(this.inputs.labels, this.inputs.options);
    }
    if (this.outputs.length == 0) {
      this.output_combo.clear();
    } else {
      this.output_combo.update(this.outputs.labels, this.outputs.options);
    }
  }

  update_io() {
    this.inputs = this._createIO(this.midiAccess.inputs);
    this.outputs = this._createIO(this.midiAccess.outputs);
  }
}

Section.add_class('io_select', IOSelect, ['midiAccess']); 
