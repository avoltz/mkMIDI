export default class MessageHandler {
  constructor(controller) {
    this.controller = controller;
  }

  /* dispatch the message and return the # of
     bytes used, or -1 if incomplete message */
  handle_message(evt) {
    let str = "";
    evt.data.forEach((d) => {
      let d_str = d.toString(2);
      while (d_str.length < 8) {
        d_str = "0" + d_str;
      }
      str += `${d_str} `;
    });
    console.log(`-- rx: ${evt.data.length} ${str}`);
    let buf = evt.data;
    if (buf.length === 0) return 0;
    if (buf[0] === 0xf8) return 1; // midi clock
    if (buf[0] !== 0xf0) {
      /* transmitted channel message */
      let channel = 0x0f & buf[0];
      let msn = 0xf0 & buf[0];
      console.log(` - channel ${channel}`);
      if (msn === 0xc0) {
        // program change
        console.log(` - program changed`);
      } else if (msn === 0xb0) {
        switch (buf[1]) {
          case 0x63: // nrpn param num msb
            console.log(' - nrpn pn msb');
            break;
          case 0x62: // nrpn param num lsb
            console.log(' - nrpn pn lsb');
            break;
          case 0x06: // nrpn param val msb
            console.log(' - nrpn val msb');
            break;
          case 0x26: // nrpn param val lsb
            console.log(' - nrpn val lsb');
            break;
          case 0x07: // volume knob
            console.log(' - volume knob');
            break;
          case 0x20: // bank select
            console.log(' - bank select');
          default:
            // handle cc
            console.log(' - cc message');
        }
      }
    } else {
      /* transmitted sysex message */
      console.log(' - sysex message');
    }
    console.log('--')
  }
}
