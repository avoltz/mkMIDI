// this special element reflects the i/o binding for the midi controller
export default class IOSelect {
  constructor(controller, el) {
    this.element = document.createElement("div");
    this.element.className = 'io-select';
    let name = document.createElement("span");
    name.innerHTML = "I/O Select";
    this.element.appendChild(name);

    this.input_combo = document.createElement('select');
    let self = this;
    this.input_combo.onchange = function() { self.input_changed(); };
    this.element.appendChild(this.input_combo);

    this.output_combo = document.createElement('select');
    this.output_combo.onchange = function() { self.output_changed(); };
    this.element.appendChild(this.output_combo);

    this.controller = controller;
    el.appendChild(this.element);

    this.midiAccess = undefined; // this is setup when update is called
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

  create_combo(combo, labels, options) {
    while (combo.children.length > 0) {
      combo.removeChild(combo.firstChild);
    }
    for (let i=0; i<labels.length;i++) {
      let op = document.createElement('option');
      op.text = labels[i];
      op.value = options[i];
      combo.appendChild(op);
    }
  }

  set_midi_access(midiAccess) { this.midiAccess = midiAccess; };

  update(midiAccess) {
    let inputs = this._createIO(midiAccess.inputs);
    let outputs = this._createIO(midiAccess.outputs);
    this.create_combo(this.input_combo, inputs.labels, inputs.options);
    this.create_combo(this.output_combo, outputs.labels, outputs.options);
    console.log(`got midi access ${midiAccess}`);
    this.midiAccess = midiAccess;
  }

  input_changed(evt) {
    if (typeof(this.midiAccess) === 'undefined') {
      console.log('io_changed but no midiAccess');
      return;
    }
    let input = this.midiAccess.inputs.get(
      this.input_combo.options[this.input_combo.selectedIndex].value
    );
    this.controller.set_input(input);
  }

  output_changed(evt) {
    if (typeof(this.midiAccess) === 'undefined') {
      console.log('io_changed but no midiAccess');
      return;
    }
    let output = this.midiAccess.outputs.get(
      this.output_combo.options[this.output_combo.selectedIndex].value
    );
    this.controller.set_output(output);
  }
}
