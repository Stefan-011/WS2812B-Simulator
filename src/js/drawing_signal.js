import { SIGNAL_SIZE, NUM_OF_RGB, BIT_SIZE } from "./appFunctions.js";

const canvas = [
  document.getElementById("binaryChartR"),
  document.getElementById("binaryChartG"),
  document.getElementById("binaryChartB"),
];

const ctx = [
  document.getElementById("binaryChartR").getContext("2d"),
  document.getElementById("binaryChartG").getContext("2d"),
  document.getElementById("binaryChartB").getContext("2d"),
];

const SIGNAL_POWER = 60;
const y_size = canvas[0].height - SIGNAL_POWER / 2;
const AMPLIFIER = 3;
const T0H = 4 * AMPLIFIER;
const T1H = 8 * AMPLIFIER;
const T0L = 8.5 * AMPLIFIER;
const T1L = 4.5 * AMPLIFIER;

function Initilize_canvas() {
  ctx.forEach((context) => {
    context.strokeStyle = "lime";
    context.font = "1.2rem Consolas";
    context.fillStyle = "white";
  });
}

export function draw_one(ctx, canvas, position) {
  console.log("draw one");

  ctx.fillText(
    "1",
    position * (T1H + T1L) + SIGNAL_POWER / 6,
    SIGNAL_POWER / 2
  );

  ctx.moveTo(position * (T1H + T1L), 0);
  ctx.lineTo(position * (T1H + T1L), canvas.height);

  if (position == 1) {
    ctx.moveTo(position * (T1H + T1L), y_size);
    ctx.lineTo(position * (T1H + T1L), y_size - SIGNAL_POWER);
  } else ctx.moveTo(position * (T1H + T1L), y_size - SIGNAL_POWER);

  ctx.lineTo(position * (T1H + T1L) + T1H, y_size - SIGNAL_POWER);
  ctx.lineTo(position * (T1H + T1L) + T1H, y_size);
  ctx.lineTo(position * (T1H + T1L) + T1H + T1L, y_size);
  ctx.lineTo(position * (T1H + T1L) + T1H + T1L, y_size - SIGNAL_POWER);

  if (position != 7) {
    ctx.moveTo(position * (T1H + T1L) + T1H + T1L, 0);
    ctx.lineTo(position * (T1H + T1L) + T1H + T1L, canvas.height);
  }
  ctx.stroke();
}

export function draw_zero(ctx, canvas, position) {
  console.log("draw zero");

  ctx.fillText(
    "0",
    position * (T0H + T0L) + SIGNAL_POWER / 6,
    SIGNAL_POWER / 2
  );

  ctx.moveTo(position * (T0H + T0L), 0);
  ctx.lineTo(position * (T0H + T0L), canvas.height);

  if (position == 1) {
    ctx.moveTo(position * (T0H + T0L), y_size);
    ctx.lineTo(position * (T0H + T0L), y_size - SIGNAL_POWER);
  } else ctx.moveTo(position * (T0H + T0L), y_size - SIGNAL_POWER);

  ctx.lineTo(position * (T0H + T0L) + T0H, y_size - SIGNAL_POWER);
  ctx.lineTo(position * (T0H + T0L) + T0H, y_size);
  ctx.lineTo(position * (T0H + T0L) + T0H + T0L, y_size);
  ctx.lineTo(position * (T0H + T0L) + T0H + T0L, y_size - SIGNAL_POWER);
  if (position != 7) {
    ctx.moveTo(position * (T0H + T0L) + T0H + T0L, 0);
    ctx.lineTo(position * (T0H + T0L) + T0H + T0L, canvas.height);
  }

  ctx.stroke();
}

function clear_signal() {
  for (let i = 0; i < NUM_OF_RGB; i++)
    ctx[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
  console.log("clearing");
}

export function drawBinarySignal(binaryArray) {
  clear_signal();
  Initilize_canvas();
  for (let i = 0; i < SIGNAL_SIZE; i++) {
    if (binaryArray[i] == 0) {
      if (binaryArray[i + 1] !== null) {
        if (i <= 7) draw_zero(ctx[0], canvas[0], i % BIT_SIZE);
        else if (i >= 8 && i < 16) draw_zero(ctx[1], canvas[1], i % BIT_SIZE);
        else draw_zero(ctx[2], canvas[2], i % BIT_SIZE);
      }
    } else {
      if (i < 8) draw_one(ctx[0], canvas[0], i % BIT_SIZE);
      else if (i > 8 && i < 16) draw_one(ctx[1], canvas[1], i % BIT_SIZE);
      else draw_one(ctx[2], canvas[2], i % BIT_SIZE);
    }
  }
}
