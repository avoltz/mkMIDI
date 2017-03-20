class Button {
  constructor() {
  }
  create_canvas(el, cls, height, width) {
    var new_element = document.createElement("canvas");
    new_element.className = cls;
    new_element.height = height;
    new_element.width = width;
    new_element.onclick = this.onClick;
    el.appendChild(new_element);
    return new_element;
  }
  setup_context(el) {
      var ctx = el.getContext("2d");
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.beginPath();
      return ctx;
  }
  onClick() {
    // check for data-nprn or data-cc attributes and send
    console.log('click click ritchie');
  }
}

class GroupButton extends Button {
  constructor(el, size) {
    super();
    var canvas = this.create_canvas(el, 'grp_btn', size, size);
    this.draw(canvas);
  }
  draw(el) {
    var ctx = this.setup_context(el);
    var mid_height = el.height / 2;
    var mid_width = el.width / 2;
    ctx.moveTo(1 / 8 * el.width, mid_height);
    ctx.lineTo(7 / 8 * el.width, mid_height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mid_width, 1 / 8 * el.height);
    ctx.lineTo(mid_width, 7 / 8 * el.height);
    ctx.stroke();
  }
}

class WaveShapeButton extends Button {
  constructor(el, cls, height, width) {
    super()
    var new_element = this.create_canvas(el, cls, height, width);
    this.draw(new_element);
  }
  setup_context(el) {
      var ctx = super.setup_context(el);
      var height = 3 / 4 * el.height;
      var bottom = 1 / 4 * el.height;
      ctx.moveTo(1 / 8 * el.width, height);
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

  draw(el) {
    var {
      ctx,
      height,
      bottom
    } = this.setup_context(el);
    ctx.lineTo(5 / 16 * el.width, bottom);
    ctx.lineTo(1 / 2 * el.width, height);
    ctx.lineTo(11 / 16 * el.width, bottom);
    ctx.lineTo(7 / 8 * el.width, height);
    ctx.stroke();
  }
}

class SquareButton extends WaveShapeButton {
  constructor(el, height, width) {
    super(el, 'sq_btn', height, width);
  }
  draw(el) {
    var {
      ctx,
      height,
      bottom
    } = this.setup_context(el);
    var x_points = [3 / 16, 7 / 16, 9 / 16, 13 / 16];
    var y_next = height;
    var y_nextnext = bottom;
    x_points.forEach(x => {
        var width = x * el.width;
        ctx.lineTo(width, y_next);
        ctx.lineTo(width, y_nextnext);
        // reuse width here as a place to keep y_next so we swap...
        width = y_next;
        y_next = y_nextnext;
        y_nextnext = width;
      })
    ctx.lineTo(7 / 8 * el.width, height);
    ctx.stroke();
  }
}

class SawtoothButton extends WaveShapeButton {
  constructor(el, height, width) {
    super(el, 'saw_btn', height, width);
  }
  draw(el) {
    var {
      ctx,
      height,
      bottom
    } = this.setup_context(el);
    var x_points = [5 / 16, 1 / 2, 11 / 16, 14 / 16];
    x_points.forEach(x => {
      var width = x * el.width;
      ctx.lineTo(width, bottom);
      ctx.lineTo(width, height);
    })
    ctx.stroke();
  }
}
