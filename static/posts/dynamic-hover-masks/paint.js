registerPaint ('circle', class {
    static get inputProperties() {
      return [
        '--x',
        '--y',
        '--size'
      ];
    }
    paint (ctx, geom, properties) {
      const x = parseFloat(properties.get('--x').toString());
      const y = parseFloat(properties.get('--y').toString());
      const size = parseFloat(properties.get('--size').toString());

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
