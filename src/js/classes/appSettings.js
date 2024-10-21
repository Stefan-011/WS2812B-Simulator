import { DARK_MODE_BUTTON } from "../constants.js";

export class appSettings {
  #NUM_OF_CHIPS;
  #SIMULATION_TIME;
  #DARK_MODE;
  this;

  constructor() {
    if (
      localStorage.getItem("NUM_OF_CHIPS") == null ||
      localStorage.getItem("NUM_OF_CHIPS") >= 100
    ) {
      this.#NUM_OF_CHIPS = 16;
      localStorage.setItem("NUM_OF_CHIPS", 16);
    } else this.#NUM_OF_CHIPS = localStorage.getItem("NUM_OF_CHIPS");

    if (
      localStorage.getItem("SIMULATION_TIME") == null ||
      localStorage.getItem("SIMULATION_TIME") >= 8000
    ) {
      localStorage.setItem("SIMULATION_TIME", 1000);
      this.#SIMULATION_TIME = 1000;
    } else this.#SIMULATION_TIME = localStorage.getItem("SIMULATION_TIME");

    if (
      localStorage.getItem("DARK_MODE") == null ||
      localStorage.getItem("DARK_MODE") > 1 ||
      localStorage.getItem("DARK_MODE") < 0
    ) {
      localStorage.setItem("DARK_MODE", 1);
      this.#DARK_MODE = 1;
    } else this.#DARK_MODE = localStorage.getItem("DARK_MODE");
  }

  changeNumOfChips(value) {
    if (value > 0 && value <= 100) localStorage.setItem("NUM_OF_CHIPS", value);
  }
  changeSimulationTime(value) {
    if (value > 0 && value <= 8000)
      localStorage.setItem("SIMULATION_TIME", value);
  }
  changeDarkMode() {
    if (this.#DARK_MODE == 0) this.#DARK_MODE = 1;
    else this.#DARK_MODE = 0;
    localStorage.setItem("DARK_MODE", this.#DARK_MODE);
    this.#changeDarkModeIcon();
  }

  getNumOfChips() {
    return this.#NUM_OF_CHIPS;
  }

  getSimulationTime() {
    return this.#SIMULATION_TIME;
  }

  getDarkMode() {
    if (this.#DARK_MODE != 1) document.body.classList.toggle("lightmode");
    this.#changeDarkModeIcon();
    return this.#DARK_MODE;
  }

  #changeDarkModeIcon() {
    if (this.#DARK_MODE == 1) {
      DARK_MODE_BUTTON.innerText = "☀️";
    } else {
      DARK_MODE_BUTTON.innerText = "🌙";
    }
  }
}
