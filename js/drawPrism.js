export default function drawPrism(ctx, width, height) {
  let x = width / 2;
  let y = height / 2;
  const ratio = 30;
  let originX = -width / 7;
  let originY = 0;

  ctx.save();
  ctx.translate(x, y);

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(originX - 200, originY + 2 * ratio);
  ctx.lineTo(originX - (2 * ratio) / 2, originY);
  ctx.stroke();

  // 프리즘 삼각형
  ctx.beginPath();
  ctx.moveTo(originX, originY - 2 * ratio);
  ctx.lineTo(originX - 2 * ratio, originY + 2 * ratio);
  ctx.lineTo(originX + 2 * ratio, originY + 2 * ratio);
  ctx.closePath();
  ctx.stroke();

  // 무지개 광선
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];
  const baseAngle = 15; // 삼각형 오른쪽 변의 기울기
  const spread = 1.7;
  colors.forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();

    const startX = originX + (2 * ratio) / 2.5 + i * 2;
    const startY = originY - (2 * ratio) / 4.5 + i * 4.5;

    ctx.moveTo(startX, startY);

    const angle =
      baseAngle + (i - colors.length / 2) * (spread / colors.length);
    const length = 210 - i;

    const x = startX + length * Math.cos((angle * Math.PI) / 180);
    const y = startY + length * Math.sin((angle * Math.PI) / 180);
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  // 삼각형 내 굴절
  ctx.beginPath();
  ctx.moveTo(originX - (2 * ratio) / 2, originY);
  ctx.lineTo(originX + (2 * ratio) / 2.5, originY - (2 * ratio) / 4.5);
  ctx.lineTo(originX + (2 * ratio) / 1.5, originY + (2 * ratio) / 3);
  ctx.closePath();
  ctx.strokeStyle = "rgba(255, 255, 255, 0)";
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fill();
  ctx.stroke();

  // 텍스트
  ctx.font = "bold 100px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("rchive", originX + 2 * ratio, originY + 2 * ratio + 12);

  ctx.restore();
}
