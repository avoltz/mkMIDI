export default class MidiWidget {
  /* params is a list of param:
     {
       name: string,
       label: string, (a shorter version of name, like 'Osc 1 Mix')
       nrpn: int,
       cc : int, (optional)
       max : int
     }
  */
  constructor() {
    this.params = [];

    /* register as something to be watched */
    MidiControl.bind(this);
  }

  // set this.params
  bind_params(params) {
  }

  // update the value of a param
  update_param(param) {
  }
}
