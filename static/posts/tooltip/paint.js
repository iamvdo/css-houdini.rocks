registerPaint('tooltip', class Bubble {

  static get inputProperties() {
    return [
      'background-color'
    ];
  }

  paint(ctx, geom, props, args) {

    const color = props.get('background-color').toString()

    ctx.beginPath();
    ctx.moveTo(geom.width / 2 - 30, 0);
    ctx.lineTo(geom.width / 2 + 30, 0);
    ctx.lineTo(geom.width / 2, geom.height);
    ctx.closePath();

    // fill
    ctx.fillStyle = color;
    ctx.fill();

  }

})