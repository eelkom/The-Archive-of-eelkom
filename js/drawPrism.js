export default function drawPrism(ctx, width, height, phase, progress) {
  const x = width / 2;
  const y = height / 2;
  const ratio = 30 * 2;
  const origin = { x: -110, y: 100 };

  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 3;

  // 입사광선
  if (phase === "incoming") {
    const start = { x: origin.x - 200, y: origin.y + ratio };
    const end = { x: origin.x - ratio / 2 + 2, y: origin.y };

    const cur = {
      x: start.x + (end.x - start.x) * (phase === "incoming" ? progress : 1),
      y: start.y + (end.y - start.y) * (phase === "incoming" ? progress : 1),
    };

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(cur.x, cur.y);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  // 프리즘 내부 굴절 삼각형
  if (phase === "refraction") {
    // 굴절 삼각형 좌표
    const p1 = { x: origin.x - ratio / 2, y: origin.y };
    const p2 = {
      x: origin.x + ratio / 2.5,
      y: origin.y - ratio / 4.5,
    };
    const p3 = { x: origin.x + ratio / 1.5, y: origin.y + ratio / 3 };

    const curP2 = {
      x: p1.x + (p2.x - p1.x) * (phase === "refraction" ? progress : 1),
      y: p1.y + (p2.y - p1.y) * (phase === "refraction" ? progress : 1),
    };
    const curP3 = {
      x: p1.x + (p3.x - p1.x) * (phase === "refraction" ? progress : 1),
      y: p1.y + (p3.y - p1.y) * (phase === "refraction" ? progress : 1),
    };

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(curP2.x, curP2.y);
    ctx.lineTo(curP3.x, curP3.y);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
    ctx.fill();
  }

  // 무지개 스팩트럼
  if (phase === "spectrum") {
    const colors = [
      "#cc4444", // desaturated red
      "#cc8844", // desaturated orange
      "#cccc44", // desaturated yellow
      "#44aa44", // desaturated green
      "#4488cc", // desaturated blue
      "#334477", // desaturated navy
      "#774488", // desaturated purple
    ];
    const baseAngle = 15;
    const spread = 1.7;
    const spectrumLength = 210;

    colors.forEach((color, i) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      const angle =
        baseAngle + (i - colors.length / 2) * (spread / colors.length);

      const start = {
        x: origin.x + ratio / 2.5 + i * 2,
        y: origin.y - ratio / 4.5 + i * 4.5,
      };
      const end = {
        x: start.x + spectrumLength * Math.cos((angle * Math.PI) / 180),
        y: start.y + spectrumLength * Math.sin((angle * Math.PI) / 180),
      };

      const cur = {
        x: start.x + (end.x - start.x) * (phase === "spectrum" ? progress : 1),
        y: start.y + (end.y - start.y) * (phase === "spectrum" ? progress : 1),
      };

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(cur.x, cur.y);
      ctx.stroke();
    });
  }

  // 텍스트 "rchive"
  ctx.font = "700 97px sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.fillText("rchive", origin.x + ratio, origin.y + ratio + 11);

  // 텍스트 "of eelkom"
  ctx.font = "500 25px sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.fillText("of eelkom", origin.x + ratio + 215, origin.y + ratio + 45);

  // 프리즘 삼각형 좌표
  const p1 = { x: origin.x, y: origin.y - ratio };
  const p2 = { x: origin.x - ratio, y: origin.y + ratio };
  const p3 = { x: origin.x + ratio, y: origin.y + ratio };

  // 프리즘 삼각형
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.closePath();
  ctx.strokeStyle = "white";
  ctx.stroke();

  ctx.restore();
}
