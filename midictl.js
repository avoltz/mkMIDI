/* The owns info about the signals */
class MidiParam {
  constructor(nrpn, max=10, cc=undefined) {
    this.nrpn = nrpn;
    this.cc = cc;
    this._value = 0;
    this._max = max;
  }

  set value(v) { this._value = v; }
  get value() { return this._value; }
  set max(m) { this._max = m; }
  get max() { return this._max; }
}

class MidiControl {
  // preferred is the preferred interface string name
  // TODO: keep 'preferred' in html storage
  constructor(io_select, preferred) {
    this.midiAccess = { inputs: [], outputs: [] };
    this.response = false;
    this.allowed = false;
    this.io_select = io_select;
    let _this = this;
    let onMIDISuccess = function(midiAccess) {
      _this.midiAccess = midiAccess;
      _this.allow();
    };
    let onMIDIFailure = function(midiAccess) {
      console.log('MIDI access denied');
    };
    navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);
  }

  allow() {
    this.allowed = true;
    this.io_select.update(this.midiAccess);
  }
}
