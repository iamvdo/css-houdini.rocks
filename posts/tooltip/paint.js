registerPaint('tooltip', class Bubble {

  static get inputProperties() {
    return [
      'background-color',
      '--tooltip-position',
      '--tooltip-size'
    ];
  }

  paint(ctx, geom, props, args) {

    const color = props.get('background-color').toString()
    const positionPercent = props.get('--tooltip-position').toString().replace('%', '') * 1
    const position = geom.width * positionPercent / 100
    const size = props.get('--tooltip-size').toString().replace('px', '') * 1

    ctx.beginPath();
    ctx.moveTo(position - size, 0);
    ctx.lineTo(position + size, 0);
    ctx.lineTo(position, geom.height);
    ctx.closePath();

    // fill
    ctx.fillStyle = color;
    ctx.fill();

  }

})