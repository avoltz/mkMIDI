import Instrument from 'instrument';

export class Editor {
  constructor(id) {
    let container = document.getElementById(id);
    if (typeof(container) === 'undefined') {
      console.log(`${id} not found to construct Editor`);
      return;
    }
    container.className = 'editor-container';

    let controls = document.createElement("div");
    controls.className = 'editor-controls right';

    let instrument_element = document.createElement("div");
    instrument_element.className = "instrument";
    let my_synth = {"name" : "New Synth", "sections" : []};
    this.instrument = new Instrument(instrument_element, my_synth);

    /* setup the view swap links */
    let links = document.getElementsByClassName("editor-swap-view");
    let link_click = function() {
      controls.classList.toggle("right");
      container.classList.toggle("col");
    };
    for (let i = 0; i < links.length; i++) {
      links[i].onclick = link_click;
    }

    let create_input = function(name, val) {
      let el = document.createElement("input");
      el.type = name == 'label' ? 'text' : 'number';
      el.placeholder = name;
      el.value = typeof(val) === 'undefined' ? '' : val;
      return el;
    };

    /* setup controls */
    let widget_select = document.createElement("select");
    for (let p in Section.params) {
      let op = document.createElement("option");
      op.innerHTML = p;
      op.value = p;
      widget_select.appendChild(op);
    }
    widget_select.selectedIndex = -1;
    let control_params = document.createElement("div");
    control_params.className = 'editor-control-params';
    widget_select.onchange = function() {
      while (control_params.children.length > 0) { control_params.removeChild(control_params.firstChild); }
      let params = Section.params[widget_select.value];
      for (let i = 0; i < params.length; i++) {
        let e = create_input(params[i]);
        control_params.appendChild(e);
      }
    };
    controls.appendChild(widget_select);
    let add = document.createElement('input');
    add.type = 'button';
    add.value = 'Add';
    add.onclick = function() {
      console.log('add');
    };
    controls.appendChild(add);
    controls.appendChild(control_params);

    /* add the elements to the page */
    container.appendChild(instrument_element);
    container.appendChild(controls);
  }
}
