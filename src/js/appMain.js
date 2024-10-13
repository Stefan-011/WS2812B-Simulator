import { linkedlist } from "./classes/linkedList.js";
import { chip } from "./classes/chip.js";
import { RGB } from "./classes/rgb.js";
import { start_simulation } from "./appFunctions.js";
import { appSettings } from "./classes/appSettings.js";
import {
  RED_BUTTON,
  GREEN_BUTTON,
  BLUE_BUTTON,
  RGB_BUTTON,
  BW_BUTTON,
  DARK_MODE_BUTTON,
  SAVE_AS_BUTTON,
  DELAY_INPUT,
  SAVE_SETTING_BUTTON,
  CHIP_INPUT,
} from "./constants.js";

const _setting = new appSettings();
export let SIMULATION_TIME = _setting.getSimulationTime();
export let NUM_OF_CHIPS = _setting.getNumOfChips();

const LED_STRIP = new linkedlist();

function Initialize_chips() {
  for (let i = 0; i < NUM_OF_CHIPS; i++) {
    const new_chip = new chip(i * 100);
    LED_STRIP.addNode(new_chip);
  }
}
function getAllBinary() {
  let RetVal = "";
  let curr_chip = LED_STRIP.getHead();

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
  _setting.getDarkMode();
  let COLOR = new RGB();
  const colorType = { type: "none" };

  Initialize_chips();

  RED_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(255, 0, 0);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType, LED_STRIP);
  });

  GREEN_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 255, 0);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType, LED_STRIP);
  });

  BLUE_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 255);
    colorType.type = "non-RGB";
    start_simulation(COLOR, colorType, LED_STRIP);
  });

  RGB_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 0);
    colorType.type = "RGB";
    start_simulation(COLOR, colorType, LED_STRIP);
  });

  BW_BUTTON.addEventListener("click", () => {
    COLOR.setFullColor(0, 0, 0);
    colorType.type = "black/white";
    start_simulation(COLOR, colorType, LED_STRIP);
  });

  DARK_MODE_BUTTON.addEventListener("click", () => {
    document.body.classList.toggle("lightmode");
    _setting.changeDarkMode();
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

  SAVE_SETTING_BUTTON.addEventListener("click", () => {
    console.log(CHIP_INPUT);
    _setting.changeNumOfChips(CHIP_INPUT.value);
    _setting.changeSimulationTime(DELAY_INPUT.value);
    window.location.reload();
  });
};
