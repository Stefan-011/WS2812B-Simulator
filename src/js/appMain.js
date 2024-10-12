import { linkedlist } from "./classes/linkedList.js";
import { chip } from "./classes/chip.js";
import { RGB } from "./classes/rgb.js";
import { start_simulation } from "./appFunctions.js";
import { NUM_OF_CHIPS } from "./constants.js";

export const RED_BUTTON = document.getElementById("red-sim");
export const GREEN_BUTTON = document.getElementById("green-sim");
export const BLUE_BUTTON = document.getElementById("blue-sim");
export const RGB_BUTTON = document.getElementById("rgb-sim");
export const BW_BUTTON = document.getElementById("bw-sim");
export const DARK_MODE_BUTTON = document.getElementById("dark-mode-btn");

const strip = new linkedlist();

function Initialize_chips() {
  for (let i = 0; i < NUM_OF_CHIPS; i++) {
    const new_chip = new chip(i * 100);
    strip.addNode(new_chip);
  }
}
function getAllBinary() {
  let RetVal = "";
  let curr_chip = strip.getHead();

  while (curr_chip != null) {
    curr_chip.getBinarySignal().forEach((bit) => {
      RetVal = RetVal.concat(bit);
    });

    RetVal = RetVal.concat("\n");
    curr_chip = curr_chip.getNext();
  }
  return RetVal;
}
window.onload = () => {
  let COLOR = new RGB();
  const colorType = { type: "none" };

  Initialize_chips();

  RED_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(255, 0, 0);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType, strip);
  });

  GREEN_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 255, 0);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType, strip);
  });

  BLUE_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 255);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType, strip);
  });

  RGB_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 0);
    colorType.type = "RGB";
    start_simulation(COLOR, colorType, strip);
  });

  BW_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 0);
    colorType.type = "black/white";
    start_simulation(COLOR, colorType, strip);
  });

  DARK_MODE_BUTTON.addEventListener("click", () => {
    document.body.classList.toggle("lightmode");
  });

  SAVE_AS_BUTTON.addEventListener("click", async () => {
    const fileHandle = await window.showSaveFilePicker({
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".txt"] },
        },
      ],
    });
    const writableStream = await fileHandle.createWritable();
    const content = getAllBinary();
    await writableStream.write(content);
    await writableStream.close();
  });
};
