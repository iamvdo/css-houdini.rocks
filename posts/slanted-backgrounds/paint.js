registerPaint('slanted-bg', class {
  constructor () {
    this.hue = 266;
  }
  paint (ctx, geom, properties, args) {
    // draw random colors
    ctx.fillStyle = 'hsl(' + this.hue + ', 100%, 50%)';
    this.hue += 10;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(geom.width, 0);
    ctx.lineTo(geom.width - 20, geom.height);
    ctx.lineTo(0, geom.height);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-atop';

    ctx.fillStyle = 'rgba(0,0,0,.35)';
    ctx.beginPath();
    ctx.moveTo(0, geom.height);
    ctx.lineTo(geom.width, geom.height - 8);
    ctx.lineTo(geom.width, geom.height);
    ctx.fill();
  }
})