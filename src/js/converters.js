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
    else error("304");
  });
}

export function toASCII(binary_num) {
  const RetArr = [];
  let ascii_convr = 0;
  binary_num.forEach((element) => {
    RetArr.push(String.fromCharCode(element));
  });
  return RetArr;
}
