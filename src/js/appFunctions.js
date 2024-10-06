import { toBinary, toASCII, toRGB } from "./converters.js";
import { RGB } from "./classes/rgb.js";
const number_of_bits = 8;
let outputTester = "";
toBinary(155, number_of_bits).then(
  (binary_arr) => {
    console.log(binary_arr);
    toASCII(binary_arr).forEach((element) => {
      outputTester += element;
    });
    console.log(toASCII(binary_arr));
    console.log(outputTester);
  },
  (error_code) => {
    console.log(error_code);
  }
);

const send = [
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
];
console.log(toRGB(send, 8));
