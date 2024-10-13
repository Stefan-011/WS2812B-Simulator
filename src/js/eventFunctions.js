const closeBtn = document.getElementById("closeBtn");
const miniBtn = document.getElementById("miniBtn");
const maxBtn = document.getElementById("maxBtn");

import {
  SAVE_SETTING_BUTTON,
  CHIP_INPUT,
  DELAY_INPUT,
  SETTINGS_MENU_BTN,
} from "./constants.js";

closeBtn.addEventListener("click", () => {
  window.electronAPI.closeApp();
});

miniBtn.addEventListener("click", () => {
  window.electronAPI.minimizeApp();
});

maxBtn.addEventListener("click", () => {
  window.electronAPI.maximizeApp();
});

CHIP_INPUT.addEventListener("input", (input) => {
  SAVE_SETTING_BUTTON.style.display = "block";
});

DELAY_INPUT.addEventListener("input", (input) => {
  SAVE_SETTING_BUTTON.style.display = "block";
});

SETTINGS_MENU_BTN.addEventListener("click", () => {
  let settings_area = document.getElementById("settings-area");
  if (settings_area.style.display == "flex")
    settings_area.style.display = "none";
  else settings_area.style.display = "flex";
});
