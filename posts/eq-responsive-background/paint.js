registerPaint('bg', class {
  static get inputProperties() {
    return [
      '--breakpoint'
    ]
  }
  static get inputArguments() {
    return [
      '<color>',
      '<color>'
    ]
  }
  paint (ctx, geom, properties, args) {
    const breakpoint = properties.get('--breakpoint').value;
    let color = geom.width < breakpoint ? args[0] : args[1];
    color = color.toString();

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, geom.width, geom.height);
  }
})