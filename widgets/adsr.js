class ADSRView {
  constructor(el, max, height, width, values) {
    let wrapper = document.createElement("div");
    wrapper.style.display = 'inline-block';
    wrapper.className = 'adsrview';
    this.element = document.createElement("canvas");
    this.element.height = height;
    this.height = height;
    this.element.width = width;
    this.width = width / 4;
    this.max = max;
    wrapper.appendChild(this.element);
    el.appendChild(wrapper);
    if (typeof(values) != 'undefined') {
      let [a, d, s, r] = values;
      this.set_values(a, d, s, r);
    }
  }

  set_values(a, d, s, r) {
    var ctx = this.element.getContext("2d");
    ctx.clearRect(0,0,this.width,this.height);
    ctx.beginPath();

    var offset = 0;

    // attack goes to top, start from bottom of canvas
    ctx.moveTo(0, this.height);
    var atx = (a / this.max) * this.width;
    ctx.lineTo(atx, 0);
    offset += atx;

    // decay is the time to reach sustain level
    var susy = this.height - (s / this.max) * this.height;
    var dx = (d / this.max) * this.width;
    ctx.lineTo(offset + dx, susy);
    offset += dx;

    // draw the sustain line
    ctx.lineTo(offset + this.width, susy);
    offset += this.width;

    // release
    var rx = (r / this.max) * this.width;
    ctx.lineTo(offset + rx, this.height);

    ctx.stroke();
  }
}
Section.add_class('adsr', ADSRView, ['max', 'height', 'width', 'values']);
