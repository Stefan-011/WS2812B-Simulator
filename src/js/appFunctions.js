import { getRGBBits, getColorBits } from "./converters.js";
import { SIMULATION_TIME, NUM_OF_CHIPS } from "./appMain.js";
import { linkedlist } from "./classes/linkedList.js";
import {
  RED_BUTTON,
  GREEN_BUTTON,
  BLUE_BUTTON,
  RGB_BUTTON,
  BW_BUTTON,
} from "./constants.js";
import { RGB } from "./classes/rgb.js";

export function start_simulation(color, colorType, strip) {
  changeButtonState([
    RED_BUTTON,
    GREEN_BUTTON,
    BLUE_BUTTON,
    RGB_BUTTON,
    BW_BUTTON,
  ]);
  let color_bits = [];
  let curr_chip = strip.getHead();
  let iterator = 1;
  clearDiodes(strip).then(() => {
    color_bits = getColorBits(color);
    switch (colorType.type) {
      case "RGB":
        let sender_intevalRGB = setInterval(() => {
          if (NUM_OF_CHIPS <= iterator) {
            clearInterval(sender_intevalRGB);
            changeButtonState([
              RED_BUTTON,
              GREEN_BUTTON,
              BLUE_BUTTON,
              RGB_BUTTON,
              BW_BUTTON,
            ]);
          }
          let RGB_color = new RGB();
          RGB_color.setFullColor(
            getRandomInt(0, 255),
            getRandomInt(0, 255),
            getRandomInt(0, 255)
          );
          getRGBBits(RGB_color).then((RGB_bits) => {
            RGB_bits.forEach((bit) => {
              curr_chip.receive_bit(bit);
              console.log(bit);
            });
            iterator++;
          });
        }, SIMULATION_TIME);
        break;
      case "black/white":
        let second_color = new RGB();
        second_color.setFullColor(255, 255, 255);
        let second_color_bits = getColorBits(second_color);
        let sender_intevalBW = setInterval(() => {
          if (NUM_OF_CHIPS <= iterator) {
            clearInterval(sender_intevalBW);
            changeButtonState([
              RED_BUTTON,
              GREEN_BUTTON,
              BLUE_BUTTON,
              RGB_BUTTON,
              BW_BUTTON,
            ]);
          }
          if (iterator % 2 == 0)
            second_color_bits.forEach((bit) => {
              curr_chip.receive_bit(bit);
            });
          else
            color_bits.forEach((bit) => {
              curr_chip.receive_bit(bit);
            });
          iterator++;
        }, SIMULATION_TIME);

        break;
      case "non-RGB":
        let sender_intevalNoN = setInterval(() => {
          if (NUM_OF_CHIPS <= iterator) {
            clearInterval(sender_intevalNoN);
            changeButtonState([
              RED_BUTTON,
              GREEN_BUTTON,
              BLUE_BUTTON,
              RGB_BUTTON,
              BW_BUTTON,
            ]);
          }
          color_bits.forEach((bit) => {
            //console.log(bit);
            curr_chip.receive_bit(bit);
          });
          iterator++;
        }, SIMULATION_TIME);
        break;
    }
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

async function clearDiodes(strip) {
  return new Promise((cleared) => {
    let curr_chip = strip.getHead();
    while (curr_chip != null) {
      curr_chip.clear_color();
      curr_chip = curr_chip.getNext();
    }
    cleared();
  });
}

function changeButtonState(buttons) {
  buttons.forEach((button) => {
    if (button.disabled) button.disabled = false;
    else button.disabled = true;
  });
}
