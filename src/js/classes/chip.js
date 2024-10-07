import { node } from "./linkedList.js";
import { toASCII, toRGB } from "../converters.js";
export class chip extends node {
  #RGB_BINARY = [];
  #SERIAL_NUMER;
  #CONDUCTOR;

  constructor(serial_num) {
    super();
    this.#SERIAL_NUMER = serial_num;
    this.#CONDUCTOR = false;
  }

  getSerialNumber() {
    return this.#SERIAL_NUMER;
  }

  receive_bit(bit) {
    if (!this.#CONDUCTOR) this.#RGB_BINARY.push(bit);
    else {
      this.#conduct(bit);
      return;
    }
    if (this.#RGB_BINARY.length == 24) this.#CONDUCTOR = true;
  }

  #conduct(bit) {
    this._NEXT.receive_bit(bit);
  }

  light_up() {}
}
