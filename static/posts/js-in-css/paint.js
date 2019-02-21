registerPaint('background-canvas', class {
  static get inputProperties() {
      return ['--background-canvas'];
  }
  paint(ctx, geom, properties) {
      eval(properties.get('--background-canvas').toString())(ctx, geom, properties);
  }
})