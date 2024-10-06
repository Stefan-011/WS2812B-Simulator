import { toBinary, toASCII } from "./converters.js";
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
