// we need to import all the midi elements for the add_child function below
import * from 'midi/buttons';
import * from 'midi/combos';
import * from 'midi/slider';

// this is a special widget responsible for creating all other widgets
export class Section {
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
    Section.classes[name] = cls;
    Section.params[name] = params;
  }
}
// setup our static vars
Section.classes = {};
Section.params = {};
Section.add_class('section', Section, []);
