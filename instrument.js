class Section {
  constructor(el, section) {
    let section_el = document.createElement("div");
    section_el.className = 'inst-section';
    let name_lbl = document.createElement("span");
    name_lbl.innerHTML = section.name;
    section_el.appendChild(name_lbl);
    section.widgets.forEach(widget => {
      var args = ["thisarg", section_el];
      // if we are creating a section, we have to reference ourself.
      if (widget.type == 'section') {
        args.push(widget);
      }
      Section.params[widget.type].forEach(p => {
        args.push(widget[p]);
      });
      let child = new (Function.prototype.bind.apply(Section.classes[widget.type], args))();
    });
    el.appendChild(section_el);
    this.element = section_el; // allows contents to be removed without label
  }
  static add_class(name, cls, params) {
    Section.classes[name] = cls;
    Section.params[name] = params;
  }
}

class Instrument {
  constructor(el, model) {
    let synth_el = document.createElement("div");
    this.name = model.name;
    model.sections.forEach(section => {
      // section
      let s = new Section(el, section);
    });
    this.midi_control = new MidiControl();
  }
}
{
  // setup our static vars
  Section.classes = {};
  Section.params = {};
  Section.add_class('section', Section, []);
}
