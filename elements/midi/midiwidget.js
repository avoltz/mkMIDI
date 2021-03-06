/* Assumption, each widget only has one parameter.
   Subclasses could override this, if the model is setup
*/
export default class MidiWidget {
  /*
    Pass the whole model object reference in. Each subclass can handle
    unique parameters.
  */
  constructor(controller, model_object) {
    this.model_object = model_object;
    this.controller = controller;
    controller.bind_widget(this);
  }
  // these may return undefined
  get cc() { return this.model_object.cc; }
  get nrpn() { return this.model_object.nrpn; }

  update(value) {
    console.log('new value sent from controller.');
  }

  send_update() {
    this.controller.widget_updated(this);
  }
}
