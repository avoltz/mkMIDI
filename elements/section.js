// some module 'static' vars...
var classes = {};
var params = {};

// this is a special widget responsible for creating all other widgets
export default class Section {
  constructor(el, section) {
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
    var args = ["thisarg", this.element];
    // if we are creating a section, we have to reference ourself.
    if (widget.type == 'section') {
      args.push(widget);
    }
    Section.params[widget.type].forEach(p => {
      args.push(widget[p]);
    });
    let child = new (Function.prototype.bind.apply(Section.classes[widget.type], args))();
  }

  remove_child() {
    // todo: for rearranging the widgets
  }

  static add_class(name, cls, params) {
    classes[name] = cls;
    params[name] = params;
  }
}
// setup our static vars
Section.add_class('section', Section, []);
