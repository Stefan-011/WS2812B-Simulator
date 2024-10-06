import { RGB } from "./classes/rgb.js";

export async function toBinary(number, bit_size) {
  return new Promise((resolve, error) => {
    const RetArr = [];
    for (let i = bit_size - 1; i >= 0; i--)
      if (Math.pow(2, i) > number) RetArr.push(0);
      else {
        RetArr.push(1);
        number -= Math.pow(2, i);
      }
    if (RetArr.length == 8) resolve(RetArr);
    else error("binary code is not 8bit");
  });
}

export function toASCII(binary_num) {
  const RetArr = [];
  binary_num.forEach((element) => {
    RetArr.push(String.fromCharCode(element));
  });
  return RetArr;
}

export function toRGB(signal, bits_per_block) {
  const RetVal = new RGB();
  let num_of_RGB = 3;
  for (let i = 0; i < num_of_RGB; i++)
    for (let j = i * bits_per_block; j < bits_per_block * (i + 1); j++) {
      switch (i) {
        case 0:
          RetVal.r += bin_to_dec_helper(signal[j], j);
          break;
        case 1:
          RetVal.g += bin_to_dec_helper(signal[j], j - bits_per_block * i);
          break;
        case 2:
          RetVal.b += bin_to_dec_helper(signal[j], j - bits_per_block * i);
          break;
      }
    }
  return RetVal;
}

function bin_to_dec_helper(bit, position) {
  let bit_position = 7 - position;
  if (bit === 0) return 0;
  else return Math.pow(2, bit_position);
}
