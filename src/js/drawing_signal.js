import { SIGNAL_SIZE } from "./appFunctions.js";

const x_size = 12;
const y_size = 12;
const canvas = document.getElementById("binaryChart");
const ctx = canvas.getContext("2d");

function draw_one(ctx, canvas, next_bit, before_bit, position) {
  console.log("draw zero");
  if (before_bit == 1) {
    if (next_bit == 1) {
      ctx.moveTo(position * x_size, y_size);
      ctx.lineTo((position + 2) * x_size, y_size);
      ctx.stroke();
      return;
    } else {
      ctx.moveTo(position * x_size, y_size);
      ctx.lineTo((position + 1) * x_size, y_size);
      ctx.lineTo((position + 1) * x_size, canvas.height - y_size);
      ctx.stroke();
      return;
    }
  }

  if (next_bit !== 1) {
    ctx.moveTo(position * x_size, canvas.height - y_size);
    ctx.lineTo(position * x_size, y_size);
    ctx.lineTo((position + 1) * x_size, y_size);
    ctx.lineTo((position + 1) * x_size, canvas.height - y_size);
    ctx.stroke();
    return;
  } else {
    ctx.moveTo(position * x_size, canvas.height - y_size);
    ctx.lineTo(position * x_size, y_size);
    ctx.lineTo((position + 1) * x_size, y_size);

    ctx.stroke();
    return;
  }
}
function draw_zero(ctx, canvas, position) {
  ctx.moveTo(position * x_size, canvas.height - y_size);
  ctx.lineTo((position + 1) * x_size, canvas.height - y_size);
  ctx.stroke();
}

export function clear_canvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawBinarySignal(binaryArray) {
  ctx.strokeStyle = "lime";

  for (let i = 0; i < SIGNAL_SIZE; i++) {
    if (binaryArray[i] == 0) {
      if (binaryArray[i + 1] !== null) draw_zero(ctx, canvas, i);
    } else {
      draw_one(ctx, canvas, binaryArray[i + 1], binaryArray[i - 1], i);
    }
  }
}
