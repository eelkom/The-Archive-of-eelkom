import drawPrism from "./drawPrism.js";

const canvas = document.getElementById("prismCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

const animationInterval = 4000;
let phase = "incoming";
let animationProgress = 0;
let lastStartTime = null;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(pixelRatio, pixelRatio);
}

function animate(timestamp) {
  if (phase !== "idle") {
    animationProgress += 0.02;
    if (animationProgress >= 1) {
      animationProgress = 0;
      if (phase === "incoming") {
        phase = "refraction";
      } else if (phase === "refraction") {
        phase = "spectrum";
      } else if (phase === "spectrum") {
        phase = "idle";
        lastStartTime = timestamp;
      }
    }
  } else {
    if (timestamp - lastStartTime > animationInterval) {
      ctx.clearRect(0, 0, width, height);
      phase = "incoming";
      animationProgress = 0;
      lastStartTime = timestamp;
    }
  }

  drawPrism(ctx, width, height, phase, animationProgress);
  requestAnimationFrame(animate);
}

function init() {
  resize();
  animate();
  window.addEventListener("resize", resize);
}

init();
