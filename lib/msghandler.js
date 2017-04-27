export default class MessageHandler {
  constructor(controller) {
    this.controller = controller;
  }

  /* dispatch the message and return the # of
     bytes used, or -1 if incomplete message */
  handle_message(evt) {
    console.log(`rx: ${evt.data.length}`);
    let str = "";
    evt.data.forEach((d) => {
      let d_str = d.toString(2);
      while (d_str.length < 8) {
        d_str = "0" + d_str;
      }
      str += `${d_str} `;
    });
    console.log(str);
    let buf = evt.data;
    if (buf.length === 0) return 0;
    /* midi timing clock */
    if (buf[0] == 0xf0) return 1;
    if (buf[0] === 0xff) { // handle sysex
      console.log('got sysex message');
    } else {
      let channel = 0x0f & buf[0];
      console.log(`...channel ${channel}`);
      switch (buf[0] & 0xf0) {
        case 0xc0: /* transmitted channel message */
          // program change
          let program = buf[1];
          console.log(`program changed to ${program+1}`);
          break;
        case 0xb0: /* transmitted (cc) controller message */
          let cc = buf[1];
          console.log(`got cc message ${cc}`);
          break;
        default:
          return -1;
      }
    }
  }
}
