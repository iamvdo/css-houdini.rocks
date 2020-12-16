class RoughDrawable {
  constructor(propertyNames) {
    this._fields = {};
    this._dirty = false;
    this._canvas = null;
    this.z = 0;
    this.roughness = 0;
    this.bowing = 1;
    this._stroke = null;
    this._strokeWidth = null;

    this._fill = null;
    this._fillStyle = null;
    this._fillWeight = null;
    this._hachureAngle = null;
    this._hachureGap = null;

    this.maxRandomnessOffset = 1;
    this._curveTightness = 0;
  }
  getOffset(min, max) {
    return this.roughness * ((Math.random() * (max - min)) + min);
  }
  drawLine(ctx, x1, y1, x2, y2, existingPath) {
    let lengthSq = Math.pow((x1 - x2), 2) + Math.pow((x1 - x2), 2);
    let offset = this.maxRandomnessOffset || 0;
    if (offset * offset * 100 > lengthSq) {
      offset = Math.sqrt(lengthSq) / 10;
    }
    let halfOffset = offset / 2;
    let divergePoint = 0.2 + Math.random() * 0.2;
    // Midpoint displacement value to give slightly bowed lines.
    let midDispX = this.bowing * this.maxRandomnessOffset * (y2 - y1) / 200;
    let midDispY = this.bowing * this.maxRandomnessOffset * (x1 - x2) / 200;
    midDispX = this.getOffset(-midDispX, midDispX);
    midDispY = this.getOffset(-midDispY, midDispY);

    if (!existingPath) {
      ctx.beginPath();
    }
    ctx.moveTo(x1 + this.getOffset(-offset, offset), y1 + this.getOffset(-offset, offset));
    ctx.bezierCurveTo(midDispX + x1 + (x2 - x1) * divergePoint + this.getOffset(-offset, offset),
      midDispY + y1 + (y2 - y1) * divergePoint + this.getOffset(-offset, offset),
      midDispX + x1 + 2 * (x2 - x1) * divergePoint + this.getOffset(-offset, offset),
      midDispY + y1 + 2 * (y2 - y1) * divergePoint + this.getOffset(-offset, offset),
      x2 + this.getOffset(-offset, offset),
      y2 + this.getOffset(-offset, offset));
    if (!existingPath) {
      ctx.stroke();
    }
    if (!existingPath) {
      ctx.beginPath();
    }
    ctx.moveTo(x1 + this.getOffset(-halfOffset, halfOffset), y1 + this.getOffset(-halfOffset, halfOffset));
    ctx.bezierCurveTo(midDispX + x1 + (x2 - x1) * divergePoint + this.getOffset(-halfOffset, halfOffset),
      midDispY + y1 + (y2 - y1) * divergePoint + this.getOffset(-halfOffset, halfOffset),
      midDispX + x1 + 2 * (x2 - x1) * divergePoint + this.getOffset(-halfOffset, halfOffset),
      midDispY + y1 + 2 * (y2 - y1) * divergePoint + this.getOffset(-halfOffset, halfOffset),
      x2 + this.getOffset(-halfOffset, halfOffset),
      y2 + this.getOffset(-halfOffset, halfOffset));
    if (!existingPath) {
      ctx.stroke();
    }
  }
}
class RoughRectangle extends RoughDrawable {
  constructor(x, y, width, height) {
    super(['x', 'y', 'width', 'height']);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    let left = this.x;
    let right = this.x + this.width;
    let top = this.y;
    let bottom = this.y + this.height;

    if (this.fill) {
      this._doFill(ctx, left, right, top, bottom);
    }

    ctx.save();
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.strokeWidth;
    this.drawLine(ctx, left, top, right, top);
    this.drawLine(ctx, right, top, right, bottom);
    this.drawLine(ctx, right, bottom, left, bottom);
    this.drawLine(ctx, left, bottom, left, top);
    ctx.restore();
  }
  _doFill(ctx, left, right, top, bottom) {
    var fillStyle = this.fillStyle || "hachure";
    switch (fillStyle) {
      case "solid": {
        ctx.save();
        ctx.fillStyle = this.fill;
        let o = this.maxRandomnessOffset || 0;
        var points = [
          [left + this.getOffset(-o, o), top + this.getOffset(-o, o)],
          [right + this.getOffset(-o, o), top + this.getOffset(-o, o)],
          [right + this.getOffset(-o, o), bottom + this.getOffset(-o, o)],
          [left + this.getOffset(-o, o), bottom + this.getOffset(-o, o)]
        ];
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        ctx.lineTo(points[1][0], points[1][1]);
        ctx.lineTo(points[2][0], points[2][1]);
        ctx.lineTo(points[3][0], points[3][1]);
        ctx.fill();
        ctx.restore();
        break;
      }
      default: {
        let xc = [left, right, right, left];
        let yc = [top, top, bottom, bottom];
        this.hachureFillShape(ctx, xc, yc);
        break;
      }
    }
  }
}

registerPaint('rough-boxes', class {

  static get inputProperties() {
    return [
      '--rough-fill',
      '--rough-stroke-width',
      '--rough-stroke',
      '--rough-roughness'
    ]
  }

  paint(ctx, geom, properties) {
    const padding = 10;
    var rect = new RoughRectangle(padding, padding, geom.width - padding * 2, geom.height - padding * 2);
    rect.roughness = properties.get('--rough-roughness').toString();
    rect.fillStyle = "solid";
    rect.fill = properties.get('--rough-fill').toString();
    rect.stroke = properties.get('--rough-stroke').toString();
    rect.strokeWidth = properties.get('--rough-stroke-width').toString().replace('px', '');
    rect.draw(ctx);

  }

})