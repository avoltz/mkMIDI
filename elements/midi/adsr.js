import Section from '../section';

/*
params {
 a: { nrpn : int, cc : optional },
 d: { nrpn : int, cc : optional },
 s: { nrpn : int, cc : optional },
 r: { nrpn : int, cc : optional }
}
*/

class ADSRView {
  constructor(controller, adsr, el) {
    let wrapper = document.createElement("div");
    wrapper.style.display = 'inline-block';
    wrapper.className = 'adsrview';
    this.element = document.createElement("canvas");
    this.element.height = adsr.height;
    this.height = adsr.height;
    this.element.width = adsr.width;
    this.width = adsr.width / 4;
    this.max = adsr.max;
    this.attack = 0;
    this.decay = 0;
    this.release = 0;
    this.sustain = 0;
    wrapper.appendChild(this.element);
    el.appendChild(wrapper);
    this.set_values(0,0,0,0);
  }

  set_values() {
    var ctx = this.element.getContext("2d");
    ctx.clearRect(0,0,this.width,this.height);
    ctx.beginPath();

    var offset = 0;

    // attack goes to top, start from bottom of canvas
    ctx.moveTo(0, this.height);
    var atx = (this.attack / this.max) * this.width;
    ctx.lineTo(atx, 0);
    offset += atx;

    // decay is the time to reach sustain level
    var susy = this.height - (this.sustain / this.max) * this.height;
    var dx = (this.decay / this.max) * this.width;
    ctx.lineTo(offset + dx, susy);
    offset += dx;

    // draw the sustain line
    ctx.lineTo(offset + this.width, susy);
    offset += this.width;

    // release
    var rx = (this.release / this.max) * this.width;
    ctx.lineTo(offset + rx, this.height);

    ctx.stroke();
  }
}
Section.add_class('adsr', ADSRView);
