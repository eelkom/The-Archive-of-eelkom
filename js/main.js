import drawPrism from "./drawPrism.js";

const canvas = document.getElementById("prismCanvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;

let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

let frame = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPrism(ctx, width, height);
  requestAnimationFrame(animate);
}

function init() {
  resize();
  animate();
  window.addEventListener("click", handleClick);
}

function handleClick() {
    
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);
}

init();
