import { getRGBBits, getColorBits } from "./converters.js";
import { linkedlist } from "./classes/linkedList.js";
import { chip } from "./classes/chip.js";
import { RGB } from "./classes/rgb.js";

const NUM_OF_CHIPS = 6;
const SIMULATION_TIME = 1000;

const strip = new linkedlist();

function start_simulation(color, colorType) {
  let color_bits = [];
  let curr_chip = strip.getHead();
  let iterator = 1;
  clearDiodes().then(() => {
    color_bits = getColorBits(color);
    switch (colorType.type) {
      case "RGB":
        let sender_intevalRGB = setInterval(() => {
          if (NUM_OF_CHIPS <= iterator) clearInterval(sender_intevalRGB);
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
          if (NUM_OF_CHIPS <= iterator) clearInterval(sender_intevalBW);
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
          if (NUM_OF_CHIPS <= iterator) clearInterval(sender_intevalNoN);
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

function Initialize_chips() {
  for (let i = 0; i < NUM_OF_CHIPS; i++) {
    const new_chip = new chip(i * 100);
    strip.addNode(new_chip);
  }
}

async function clearDiodes() {
  return new Promise((cleared) => {
    let curr_chip = strip.getHead();
    while (curr_chip != null) {
      curr_chip.clear_color();
      curr_chip = curr_chip.getNext();
    }
    cleared();
  });
}

window.onload = () => {
  const RED_BUTTON = document.getElementById("red-sim");
  const GREEN_BUTTON = document.getElementById("green-sim");
  const BLUE_BUTTON = document.getElementById("blue-sim");
  const RGB_BUTTON = document.getElementById("rgb-sim");
  const BW_BUTTON = document.getElementById("bw-sim");
  let COLOR = new RGB();
  const colorType = { type: "none" };

  Initialize_chips();

  RED_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(255, 0, 0);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType);
  });

  GREEN_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 255, 0);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType);
  });

  BLUE_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 255);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType);
  });
  RGB_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 0);
    colorType.type = "RGB";
    start_simulation(COLOR, colorType);
  });
  BW_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 0);
    colorType.type = "black/white";
    start_simulation(COLOR, colorType);
  });
};
