import { toBinary, toASCII, toRGB } from "./converters.js";
import { linkedlist } from "./classes/linkedList.js";
import { chip } from "./classes/chip.js";
import { RGB } from "./classes/rgb.js";
const num_of_RGB = 3;
const bit_size = 8;
const NUM_OF_CHIPS = 16;
window.onload = () => {
  const strip = new linkedlist();
  let color_bits = [];
  let red = new RGB();
  red.setFullColor(255, 0, 0);
  for (let i = 0; i < num_of_RGB; i++) {
    switch (i) {
      case 0:
        toBinary(red.r, bit_size).then((bit_array) => {
          bit_array.forEach((bit) => {
            color_bits.push(bit);
          });
        });
        break;
      case 1:
        toBinary(red.g, bit_size).then((bit_array) => {
          bit_array.forEach((bit) => {
            color_bits.push(bit);
          });
        });
        break;
      case 2:
        toBinary(red.b, bit_size).then((bit_array) => {
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
      curr_chip.receive_bit(bit);
    });
    curr_chip = curr_chip.getNext();
    iterator++;
  }, 1000);

  let curr_chip2 = strip.getHead();
  setTimeout(() => {
    clearInterval(sender_inteval);
    while (curr_chip2 != null) {
      curr_chip2.clear_color();
      curr_chip2 = curr_chip2.getNext();
    }
  }, 4000);
};
