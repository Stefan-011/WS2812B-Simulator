export class appSettings {
  #NUM_OF_CHIPS;
  #SIMULATION_TIME;
  #DARK_MODE;
  this;

  constructor() {
    if (
      localStorage.getItem("NUM_OF_CHIPS") == null ||
      localStorage.getItem("NUM_OF_CHIPS") > 100
    ) {
      this.#NUM_OF_CHIPS = 16;
      localStorage.setItem("NUM_OF_CHIPS", 16);
    } else this.#NUM_OF_CHIPS = localStorage.getItem("NUM_OF_CHIPS");

    if (
      localStorage.getItem("SIMULATION_TIME") == null ||
      localStorage.getItem("SIMULATION_TIME") > 6000
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
    if (value > 0) localStorage.setItem("NUM_OF_CHIPS", value);
  }
  changeSimulationTime(value) {
    if (value > 0) localStorage.setItem("SIMULATION_TIME", value);
  }
  changeDarkMode() {
    if (this.#DARK_MODE == 0) this.#DARK_MODE = 1;
    else this.#DARK_MODE = 0;
    localStorage.setItem("DARK_MODE", this.#DARK_MODE);
  }

  getNumOfChips() {
    return this.#NUM_OF_CHIPS;
  }

  getSimulationTime() {
    return this.#SIMULATION_TIME;
  }

  getDarkMode() {
    if (this.#DARK_MODE != 1) document.body.classList.toggle("lightmode");
    return this.#DARK_MODE;
  }
}
