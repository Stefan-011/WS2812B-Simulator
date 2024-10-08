import { node } from "./linkedList.js";
import { toASCII, toRGB } from "../converters.js";
import { RGB } from "./rgb.js";
export class chip extends node {
  #RGB_BINARY = [];
  #SERIAL_NUMER;
  #CONDUCTOR;

  constructor(serial_num) {
    super();
    this.#SERIAL_NUMER = serial_num;
    this.#CONDUCTOR = false;
    const strip = document.getElementById("led-strip");
    const chip_diode = document.createElement("div");
    chip_diode.classList.add("chip");
    chip_diode.id = `${this.#SERIAL_NUMER}`;
    chip_diode.style.transition = "0.2s";
    strip.appendChild(chip_diode);
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
    if (this.#RGB_BINARY.length == 24) {
      this.#CONDUCTOR = true;
      this.#light_up();
    }
  }

  #conduct(bit) {
    if (this._NEXT !== null) this._NEXT.receive_bit(bit);
  }

  #light_up() {
    let color = new RGB();
    color = toRGB(this.#RGB_BINARY, 8);
    console.log("serial number: " + this.#SERIAL_NUMER);
    console.log(color);

    const chip_diode = document.getElementById(`${this.#SERIAL_NUMER}`);
    chip_diode.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`;
  }

  clear_color() {
    const chip_diode = document.getElementById(`${this.#SERIAL_NUMER}`);
    chip_diode.style.backgroundColor = `transparent`;
  }
}
