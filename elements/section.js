// this is a special widget responsible for creating all other widgets
export default class Section {
  constructor(controller, section, el) {
    this.controller = controller;
    this.element = document.createElement("div");
    this.element.className = 'inst-section';
    // name the section
    let name_lbl = document.createElement("span");
    name_lbl.innerHTML = section.name;
    this.element.appendChild(name_lbl);
    // add the child widgets
    section.widgets.forEach(widget => {
      this.add_child(widget);
    });
    el.appendChild(this.element);
  }

  add_child(widget) {
    let child = new Section.classes[widget.type](this.controller, widget, this.element);
  }

  remove_child() {
    // todo: for rearranging the widgets
  }

  static add_class(name, cls, params) {
    Section.classes[name] = cls;
  }
}
// setup our static vars
Section.classes = { section: Section };
