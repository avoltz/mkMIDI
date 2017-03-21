class Slider {
  constructor(el, title) {
    this.value = 0;
    let container = document.createElement("div");
    container.className = 'slider';
    if (typeof(title) != 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = title;
      container.appendChild(new_lbl);
    }
    let new_el = document.createElement("input");
    new_el.type = "range";
    new_el.value = this.value;
    let value_el = document.createElement("label");
    value_el.innerHTML = this.value;
    container.appendChild(new_el);
    container.appendChild(value_el);
    el.appendChild(container);
    this.element = new_el;
  }
}

Section.add_class('slider', Slider, ['title']);
