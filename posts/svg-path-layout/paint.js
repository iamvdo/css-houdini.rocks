registerPaint('polygon', class {
  paint (ctx, geom, props) {
    const r = 10;
    ctx.fillStyle = "black";

    ctx.moveTo(r, r);
    ctx.lineTo(geom.width, 0);
    ctx.lineTo(geom.width - r, geom.height - r);
    ctx.lineTo(r, geom.height - r);
    ctx.closePath();

    ctx.fill();
  }
})