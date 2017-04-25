import MidiWidget from './midiwidget';
import Section from '../section';

/*
  Buttons have a few special params:
  on: <int> -  Value to send when the button is pressed on (default 1)
  off: <int> - Value to send when the button is pressed off (default 0)

  Optionals:
  is_on: <array of int> - Values for which button is shown pressed (default [])
   <xor>
  min: <int> - Minimum value for which it is pressed, default this.on
  max: <int> - Maximum value for which it is pressed

*/
export class Button extends MidiWidget {
  constructor(controller, button, el) {
    super(controller, button);
    this.parent_element = el;
    let container = document.createElement('div');
    let link = document.createElement('a');
    let owner = document.createElement('div');
    this.div_style = `mkm_btn ${button.type}`;
    owner.className = this.div_style;
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    this.max = button.max;
    this.min = button.min;
    this.off = typeof(button.off) !== 'undefined' ? button.off : 0;
    // set to null so that anytime we have a press we know to keep
    // the old value - used when a button is linked to a range
    if (typeof(button.on) === 'undefined') {
      this.on = null;
      this.value = this.min;
    } else {
      this.on = button.on;
      this.value = this.off;
    }
    // searchable collection of values which toggle 'on'
    this.is_on = new Set(button.is_on);
    {
      let self = this;
      link.href = '#';
      link.onclick = function() {
        if (self.on === null) {
          // we must set_value to toggle visually
          self.set_value(self.value === self.off ? self.off : self.value);
        } else if (self.value !== self.on || self.is_on.has(self.value)) {
          // turn on from the off or grouped-on state
          // make the value sticky when on is null, keep old value
          self.set_value(self.on);
        } else {
          self.set_value(self.off);
        }
        self.send_update();
      };
    }
    link.appendChild(owner);
    container.appendChild(link);
    el.appendChild(container);
    this.element = owner;
  }

  resize(height, width) {
    this.element.style.height = height;
    this.element.style.width = width;
  }

  set_value(value) {
    if (this.on !== null) {
      if (value === this.on) {
        this.element.className = `${this.div_style} pressed`;
      } else if (this.is_on.has(value)) {
        this.element.className = `${this.div_style} on`;
      } else {
        this.element.className = this.div_style;
      }
      this.value = value;
    } else {
      if (value >= this.min && value <= this.max) {
        if (value !== this.off) {
          this.element.className = `${this.div_style} pressed`;
          this.value = value;
        } else {
          this.element.className = this.div_style;
        }
      } else {
        this.element.className = this.div_style;
      }

    }
  }

  update(value) {
    this.set_value(value);
  }

  get height() { return this._height; }
  get width() { return this._width; }
  set height(h) { this._height = h; }
  set width(w) { this._width = w; }
}

export class LabelButton extends Button {
  constructor(controller, button, el) {
    super(controller, button, el);
    let label = document.createTextNode(button.name);
    this.element.appendChild(label);
  }
}
Section.add_class('lbl_btn', LabelButton);

let path_style = 'fill:none;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1';
let rect_style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1";

class SVGButton extends Button {
  constructor(controller, button, el, rect_height, rect_width, path_d) {
    super(controller, button, el);
    this.element.innerHTML = `<svg height="${button.height}" viewBox="0 0 ${rect_width} ${rect_height}">
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
      'm 25,225 112,-150 112,150 112,-150 112,150'
    );
  }
}
Section.add_class('tri_btn', TriangleButton);

export class SquareButton extends SVGButton {
  constructor(controller, button, el) {
    super(controller, button, el, '300', '500',
      'm 25,225 150,0 0,-150 150,0 0,150, 150,0'
    );
  }
}
Section.add_class('sq_btn', SquareButton);

export class SawtoothButton extends SVGButton {
  constructor(controller, button, el) {
    super(controller, button, el, '300', '500',
      'm 25,225 0,-150 150,150 0,-150 150,150 0,-150 150,150'
    );
  }
}
Section.add_class('saw_btn', SawtoothButton);
