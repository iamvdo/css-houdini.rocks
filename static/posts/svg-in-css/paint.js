registerPaint('svg-in-css', class {
  static get inputProperties() {
      return [
        '--svg-viewbox',
        '--svg-path',
        '--svg-fill',
        '--svg-stroke',
        '--svg-stroke-width'
      ];
  }
  paint(ctx, geom, properties) {
      let viewbox = String(properties.get('--svg-viewbox')).trim() || '0 0 100 100';
      viewbox = viewbox.split(' ').map(Number);

      let path = String(properties.get('--svg-path')).trim();
      // parse SVG path :(
      path = path.replace('path(', '').replace(')', '');
      path = path.substring(1, path.length - 1);

      let fill = String(properties.get('--svg-fill'));
      let stroke = String(properties.get('--svg-stroke'));
      let strokeWidth = String(properties.get('--svg-stroke-width'));

      // adapt viewbox to canvas
      ctx.scale(geom.width / viewbox[2], geom.height / viewbox[3]);
      ctx.translate(-viewbox[0], -viewbox[1]);

      let path2D = new Path2D(path);

      ctx.fillStyle = fill;
      ctx.fill(path2D);

      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeWidth;
      ctx.stroke(path2D);
  }
})