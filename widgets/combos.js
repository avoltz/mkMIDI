class Combo {
  constructor(el, labels, values, title) {
    let container = document.createElement("div");
    container.style.display = 'inline-block';
    container.className = 'combo';
    if (typeof(title) != 'undefined') {
      let new_lbl = document.createElement("label");
      new_lbl.innerHTML = title;
      container.appendChild(new_lbl);
    }
    let new_el = document.createElement("select");
    let i = 0;
    if (labels.length != values.length) {
      console.log('Combo: len of labels != values');
    }
    labels.forEach(label => {
      let op = document.createElement("option");
      op.innerHTML = label;
      op.value = values[i++];
      new_el.appendChild(op);
    });
    container.appendChild(new_el);
    el.appendChild(container);
    this.element = new_el;
  }
}

Section.add_class('combo', Combo, ['labels', 'values', 'title']);
