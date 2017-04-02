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
  constructor(preferred) {
    navigator.requestMIDIAccess({sysex: true}).then(
      function onMIDISuccess(midiAccess) {
        console.log(this);
      },
      function onMIDIFailure(midiAccess) {
        console.log(this);
      });
  }
}
