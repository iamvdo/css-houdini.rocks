registerPaint('avatar-polygon', class Polygon {

  static get inputProperties() {
    return [
      '--avatar-sides',
      '--avatar-angle'
    ]
  }

  paint(ctx, geom, properties) {

    const numSides = properties.get('--avatar-sides').toString()
    const rotate = properties.get('--avatar-angle').value

    const center = {
      x: geom.width / 2,
      y: geom.height / 2
    }
    const radius = Math.min(geom.width, geom.height) / 2

    ctx.translate(geom.width / 2, geom.height / 2)
    ctx.rotate(rotate * Math.PI / 180)
    ctx.translate(-geom.width / 2, -geom.height / 2)

    ctx.beginPath();

    var xPos = center.x + radius * Math.cos(2 * Math.PI * 0 / numSides);
    var yPos = center.y + radius * Math.sin(2 * Math.PI * 0 / numSides);
    ctx.moveTo(xPos,yPos);

    for (let i = 1; i <= numSides; i++) {
      xPos = center.x + radius * Math.cos(2 * Math.PI * i / numSides);
      yPos = center.y + radius * Math.sin(2 * Math.PI * i / numSides);
      ctx.lineTo(xPos,yPos);
    }

    ctx.closePath();

    // fill
    ctx.fillStyle = 'black';
    ctx.fill();


  }

})