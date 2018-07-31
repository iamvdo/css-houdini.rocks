registerPaint('separator', class {

  static get inputProperties() {
    return [
      'background-color',
      '--separator-shape',
      '--separator-size',
      '--separator-shadow',
      '--separator-shadow-color',
    ];
  }

  paint(ctx, geom, props, args) {

    const color = props.get('background-color').toString()
    const size = props.get('--separator-size').toString().replace('px', '')
    const shadowFactor = this.clamp(props.get('--separator-shadow').toString(), 0, 1)
    const shadowColor = props.get('--separator-shadow-color').toString()
    const shape = props.get('--separator-shape').toString().trim()

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(geom.width, 0);

    if (shape === 'diagonal-left') {
      ctx.lineTo(geom.width, geom.height * shadowFactor);
      ctx.lineTo(0, geom.height);
    }
    if (shape === 'diagonal-right') {
      ctx.lineTo(geom.width, geom.height);
      ctx.lineTo(0, geom.height * shadowFactor);
    }
    if (shape === 'curve-left') {
      ctx.lineTo(geom.width, geom.height * shadowFactor);
      ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, 0);
    }
    if (shape === 'curve-right') {
      ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, geom.height * shadowFactor);
    }

    ctx.closePath();

    // fill
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();

    if (shape === 'diagonal-left') {
      ctx.moveTo(geom.width, 0);
      ctx.lineTo(geom.width, geom.height * shadowFactor);
      ctx.lineTo(0, geom.height);
    }
    if (shape === 'diagonal-right') {
      ctx.moveTo(0, 0);
      ctx.lineTo(0, geom.height * shadowFactor);
      ctx.lineTo(geom.width, geom.height);
    }
    if (shape === 'curve-left') {
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(geom.width / 2, geom.height, geom.width, geom.height * shadowFactor);
      ctx.lineTo(geom.width, 0);
      ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, 0);
    }
    if (shape === 'curve-right') {
      ctx.moveTo(geom.width, 0);
      ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, geom.height * shadowFactor);
      ctx.lineTo(0, 0);
      ctx.quadraticCurveTo(geom.width / 2, geom.height, geom.width, 0);
    }

    ctx.closePath();

    // fill
    ctx.fillStyle = shadowColor;
    ctx.fill();

  }

  clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
  }

})