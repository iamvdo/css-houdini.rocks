registerPaint('inner-border', class {
  static get inputArguments() {
    return [
      '<length>',
      '<color>',
      '<length>',
      '<angle>'
    ]
  }
  paint (ctx, geom, properties, args) {
    let pad = parseFloat(args[2].toString());
    let width = parseFloat(args[0].toString());
    let rot = parseFloat(args[3].toString()) || 0;
    let color = args[1].toString();

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.translate(geom.width / 2, geom.height / 2);
    ctx.rotate(rot * Math.PI / 180);
    ctx.translate(-geom.width / 2, -geom.height / 2);

    ctx.strokeRect(
      pad + (width / 2),
      pad + (width / 2),
      geom.width - (pad + (width / 2)) * 2,
      geom.height - (pad + (width / 2)) * 2);
  }
})