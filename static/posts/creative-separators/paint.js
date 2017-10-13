registerPaint('separator', class {

  static get inputProperties() {
    return [
      'background-color',
      '--separator-size',
      '--separator-shadow',
      '--separator-shadow-color',
    ];
  }

  paint(ctx, geom, props, args) {

    const color = props.get('background-color').toString()
    const size = props.get('--separator-size').value
    const shadowFactor = this.clamp(props.get('--separator-shadow').toString(), 0, 1)
    const shadowColor = props.get('--separator-shadow-color').toString()

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(geom.width, 0);
    ctx.lineTo(geom.width, geom.height * shadowFactor);
    ctx.lineTo(0, geom.height);
    ctx.closePath();

    // fill
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(geom.width, 0);
    ctx.lineTo(geom.width, geom.height * shadowFactor);
    ctx.lineTo(0, geom.height);
    ctx.closePath();

    // fill
    ctx.fillStyle = shadowColor;
    ctx.fill();

  }

  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
  }

})