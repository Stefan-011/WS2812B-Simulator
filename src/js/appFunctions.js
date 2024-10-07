import { toBinary, toASCII, toRGB } from "./converters.js";
import { linkedlist } from "./classes/linkedList.js";
import { chip } from "./classes/chip.js";
import { RGB } from "./classes/rgb.js";
const number_of_bits = 8;
let outputTester = "";
// toBinary(155, number_of_bits).then(
//   (binary_arr) => {
//     console.log(binary_arr);
//     toASCII(binary_arr).forEach((element) => {
//       outputTester += element;
//     });
//     console.log(toASCII(binary_arr));
//     console.log(outputTester);
//   },
//   (error_code) => {
//     console.log(error_code);
//   }
// );

const send = [
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
];
// console.log(toRGB(send, 8));
const serial_numers = [504, 631, 642, 894];
const test_list = new linkedlist();
for (let i = 0; i < 4; i++) {
  const new_node = new chip(serial_numers[i]);
  test_list.addNode(new_node);
}

let curr_node = test_list.getHead();
while (curr_node !== null) {
  console.log(curr_node.getSerialNumber());
  curr_node = curr_node.getNext();
}
let iterator = 0;
let sender_interval = setInterval(() => {
  console.log(`iterator ${iterator} and arr size ${test_list.getSize()}`);
  if (iterator >= test_list.getSize()) clearInterval(sender_interval);
  send.forEach((bit) => {
    test_list.getHead().receive_bit(bit);
  });
  iterator++;
}, 5000);
