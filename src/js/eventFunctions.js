const closeBtn = document.getElementById("closeBtn");
const miniBtn = document.getElementById("miniBtn");
const maxBtn = document.getElementById("maxBtn");

import {
  SAVE_SETTING_BUTTON,
  CHIP_INPUT,
  DELAY_INPUT,
  SETTINGS_MENU_BTN,
  OVERFLOW_ALERT,
} from "./constants.js";

function clearAlert() {
  setTimeout(() => {
    OVERFLOW_ALERT.style.opacity = "0";
    DELAY_INPUT.disabled = false;
    CHIP_INPUT.disabled = false;
    OVERFLOW_ALERT.style.display = "none";
  }, 1600);
}

function setAlert() {
  OVERFLOW_ALERT.style.opacity = "1";
  OVERFLOW_ALERT.style.display = "flex";
  DELAY_INPUT.disabled = "true";
  CHIP_INPUT.disabled = "true";
}

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
  if (CHIP_INPUT.value > 100) {
    CHIP_INPUT.value = "";
    setAlert();
    clearAlert();
  }
  SAVE_SETTING_BUTTON.style.display = "block";
});

DELAY_INPUT.addEventListener("input", (input) => {
  if (DELAY_INPUT.value > 8000) {
    DELAY_INPUT.value = "";
    setAlert();
    clearAlert();
  }
  SAVE_SETTING_BUTTON.style.display = "block";
});

SETTINGS_MENU_BTN.addEventListener("click", () => {
  let settings_area = document.getElementById("settings-area");
  if (settings_area.style.display == "flex")
    settings_area.style.display = "none";
  else settings_area.style.display = "flex";
});
