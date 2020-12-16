registerPaint ('circle', class {
    static get inputProperties() {
      return [
        '--x',
        '--y',
        '--size'
      ];
    }
    paint (ctx, geom, properties) {
      const x = parseFloat(properties.get('--x').toString() * 1);
      const y = parseFloat(properties.get('--y').toString() * 1);
      const size = parseFloat(properties.get('--size').toString() * 1);
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(
        x, y,
        size,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
});
