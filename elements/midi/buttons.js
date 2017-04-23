import MidiWidget from './midiwidget';
import Section from '../section';

export class Button extends MidiWidget {
  constructor(constructor, button, el) {
    super(constructor, button);
    this.parent_element = el;
    let owner = document.createElement('div');
    let div_style = typeof(button.style) === 'undefined' ?
                    'mkm_btn' : `mkm_btn ${button.style}`;
    owner.className = div_style;
    owner.style.position = 'relative';
    owner.style.display = 'inline-block';
    {
      let self = this;
      owner.onclick = function() {
        self.update(! button.value);
      };
    }
    el.appendChild(owner);
    this.element = owner;
  }
  resize(height, width) {
    this.element.style.height = height;
    this.element.style.width = width;
  }
  update(value) {
    this.element.className = value ? `${div_style} pressed` : div_style;
    this.value = value;
    this.send_update();
  }
  get height() { return this._height; }
  get width() { return this._width; }
  set height(h) { this._height = h; }
  set width(w) { this._width = w; }
}

export class LabelButton extends Button {
  constructor(controller, button, el) {
    super(controller, button, el);
    let label = document.createTextNode(button.label);
    this.element.appendChild(label);
  }
}
Section.add_class('lbl_btn', LabelButton);

var path_style = 'fill:none;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1';
var rect_style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
class SVGButton extends Button {
  constructor(controller, button, el, view_port, rect_height, rect_width, path_d) {
    super(controller, button, el);
    this.element.innerHTML = `<svg height="${button.height}" viewPort="0 0 ${rect_width} ${rect_height}">
      <g>
        <rect style="${rect_style}" width="${rect_width}" height="${rect_height}" />
        <path style="${path_style}" d="${path_d}" />
      </g></svg>`;
  }
  resize(height, width) {
    // maintains aspect ratio using viewPort
    this.element.firstChild.height = height;
  }
}

export class GroupButton extends SVGButton {
  constructor(controller, button, el) {
    super(controller, button, el, '100', '100',
      'm 20,50 60,0 m 50,20 60,0'
    );
  }
}

Section.add_class('grp_btn', GroupButton);

export class TriangleButton extends SVGButton {
  constructor(controller, button, el) {
    super(controller, button, el, '300', '500',
      'm 25,225 150,150 150,-150 150,150'
    );
  }
}
Section.add_class('tri_btn', TriangleButton);

export class SquareButton extends SVGButton {
  constructor(controller, button, el) {
    super(controller, button, el, '300', '500',
      'm 25,225 150,0 0,150 150,0 0,-150, 150,0'
    );
  }
}
Section.add_class('sq_btn', SquareButton);

export class SawtoothButton extends SVGButton {
  constructor(controller, button, el) {
    super(controller, button, el, '300', '500',
      'm 25,225 150,0 0,-150 150,0 0,150 150,0 0,0'
    );
  }
}
Section.add_class('saw_btn', SawtoothButton);
