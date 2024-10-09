import { toBinary, toASCII, toRGB } from "./converters.js";
import { linkedlist } from "./classes/linkedList.js";
import { chip } from "./classes/chip.js";
import { RGB } from "./classes/rgb.js";
import { draw_one, draw_zero } from "./drawing_signal.js";

const NUM_OF_CHIPS = 3;

export const SIGNAL_SIZE = 24;
export const NUM_OF_RGB = 3;
export const BIT_SIZE = 8;

window.onload = () => {
  const RED_BUTTON = document.getElementById("red-sim");
  const GREEN_BUTTON = document.getElementById("green-sim");
  const BLUE_BUTTON = document.getElementById("blue-sim");
  const RGB_BUTTON = document.getElementById("rgb-sim");
  const BW_BUTTON = document.getElementById("bw-sim");

  RED_BUTTON.addEventListener("click", () => {
    alert("RED BTN PRESSED");
  });
  GREEN_BUTTON.addEventListener("click", () => {
    alert("GREEN BTN PRESSED");
  });
  BLUE_BUTTON.addEventListener("click", () => {
    alert("BLUE BTN PRESSED");
  });
  RGB_BUTTON.addEventListener("click", () => {
    alert("RGB BTN PRESSED");
  });
  BW_BUTTON.addEventListener("click", () => {
    alert("BW BTN PRESSED");
  });

  const strip = new linkedlist();
  let color_bits = [];
  let red = new RGB();
  red.setFullColor(255, 0, 0);
  for (let i = 0; i < NUM_OF_RGB; i++) {
    switch (i) {
      case 0:
        toBinary(red.r, BIT_SIZE).then((bit_array) => {
          bit_array.forEach((bit) => {
            color_bits.push(bit);
          });
        });
        break;
      case 1:
        toBinary(red.g, BIT_SIZE).then((bit_array) => {
          bit_array.forEach((bit) => {
            color_bits.push(bit);
          });
        });
        break;
      case 2:
        toBinary(red.b, BIT_SIZE).then((bit_array) => {
          bit_array.forEach((bit) => {
            color_bits.push(bit);
          });
        });
        break;
    }
  }
  for (let i = 0; i < NUM_OF_CHIPS; i++) {
    const new_chip = new chip(i * 100);
    strip.addNode(new_chip);
  }

  let curr_chip = strip.getHead();
  let iterator = 1;
  let sender_inteval = setInterval(() => {
    if (NUM_OF_CHIPS <= iterator) clearInterval(sender_inteval);
    color_bits.forEach((bit) => {
      console.log(bit);
      curr_chip.receive_bit(bit);
    });
    iterator++;
  }, 1000);

  // let curr_chip2 = strip.getHead();
  // setTimeout(() => {
  //   clearInterval(sender_inteval);
  //   while (curr_chip2 != null) {
  //     curr_chip2.clear_color();
  //     curr_chip2 = curr_chip2.getNext();
  //   }
  // }, 4000);
};
