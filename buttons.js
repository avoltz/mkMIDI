class Button {
  constructor(el, cls, height, width) {
    this.pressed = false;
    let new_el = document.createElement("canvas");
    new_el.className = cls;
    new_el.height = height;
    new_el.width = width;
    {
      let self = this;
      new_el.onclick = function() {
        self.pressed = ! self.pressed;
        self.element.className = self.pressed ? `${cls} pressed` : cls;
      }
    }
    this.element = new_el;
    el.appendChild(this.element);
  }
  setup_context() {
      let ctx = this.element.getContext("2d");
      ctx.clearRect(0, 0, this.element.width, this.element.height);
      ctx.beginPath();
      return ctx;
  }
  resize(height, width) {
    this.element.height = height;
    this.element.width = width;
    this.draw();
  }
  get width() { return this.element.width; };
  get height() { return this.element.height; }
}

class GroupButton extends Button {
  constructor(el, size) {
    super(el, 'grp_btn', size, size);
    this.draw();
  }
  draw() {
    let ctx = this.setup_context();
    let mid_height = this.element.height / 2;
    let mid_width = this.element.width / 2;
    ctx.moveTo(1 / 8 * this.element.width, mid_height);
    ctx.lineTo(7 / 8 * this.element.width, mid_height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mid_width, 1 / 8 * this.element.height);
    ctx.lineTo(mid_width, 7 / 8 * this.element.height);
    ctx.stroke();
  }
}

class WaveShapeButton extends Button {
  constructor(el, cls, height, width) {
    super(el, cls, height, width)
    this.draw();
  }
  setup_context() {
      let ctx = super.setup_context();
      let el = this.element;
      let height = 3 / 4 * this.element.height;
      let bottom = 1 / 4 * this.element.height;
      ctx.moveTo(1 / 8 * this.element.width, height);
      return {
        ctx,
        height,
        bottom
      };
    }
  draw(el) {
    console.log('waveshapebutton: drawing a blank');
  }

}

class TriangleButton extends WaveShapeButton {
  constructor(el, height, width) {
    super(el, 'tri_btn', height, width);
  }

  draw() {
    let {
      ctx,
      height,
      bottom
    } = this.setup_context();
    ctx.lineTo(5 / 16 * this.element.width, bottom);
    ctx.lineTo(1 / 2 * this.element.width, height);
    ctx.lineTo(11 / 16 * this.element.width, bottom);
    ctx.lineTo(7 / 8 * this.element.width, height);
    ctx.stroke();
  }
}

class SquareButton extends WaveShapeButton {
  constructor(el, height, width) {
    super(el, 'sq_btn', height, width);
  }
  draw() {
    let {
      ctx,
      height,
      bottom
    } = this.setup_context();
    let x_points = [3 / 16, 7 / 16, 9 / 16, 13 / 16];
    let y_next = height;
    let y_nextnext = bottom;
    x_points.forEach(x => {
        let width = x * this.element.width;
        ctx.lineTo(width, y_next);
        ctx.lineTo(width, y_nextnext);
        // reuse width here as a place to keep y_next so we swap...
        width = y_next;
        y_next = y_nextnext;
        y_nextnext = width;
      })
    ctx.lineTo(7 / 8 * this.element.width, height);
    ctx.stroke();
  }
}

class SawtoothButton extends WaveShapeButton {
  constructor(el, height, width) {
    super(el, 'saw_btn', height, width);
  }
  draw() {
    let {
      ctx,
      height,
      bottom
    } = this.setup_context();
    let x_points = [5 / 16, 1 / 2, 11 / 16, 14 / 16];
    x_points.forEach(x => {
      let width = x * this.element.width;
      ctx.lineTo(width, bottom);
      ctx.lineTo(width, height);
    })
    ctx.stroke();
  }
}
