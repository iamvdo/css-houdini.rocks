registerPaint('double-rainbow', class {
  static get inputProperties () {
    return [
      '--x',
      '--thick',
      '--rad',
    ]
  }
  paint (ctx, geom, properties, args) {

    function hslaColor(h,s,l,a)
    {
      return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
    }

    function arch(ctx,color,cx,cy,rad)
    {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, Math.PI, 2*Math.PI, false);
      ctx.stroke();
    }

    var cx = Number(properties.get('--x')) || geom.width / 2;
    var cy = geom.height;
    var rainbowThick = Math.max(0, Number(properties.get('--thick')));
    var bandDistance = rainbowThick * 2;
    var outerRad = Math.max(0, Number(properties.get('--rad')));

    ctx.lineWidth = 2;

    for (var band = 0; band < 2; ++band) {
      if (band == 1) {
        let step = 80;
        if (outerRad < step) {
          outerRad = 0;
        } else {
          outerRad = (outerRad - step) / (200 - step) * (200 - 0) + 0;
        }
      }
      for (var i = 0; i < rainbowThick; ++i) {
        var ratio = i/rainbowThick;
        var ratio2 = (i+band*rainbowThick)/(rainbowThick*2);
        if (band == 1)
          ratio = 1-ratio;
        var hue = Math.floor(360*ratio*ratio);
        var sat = Math.round(85 + Math.pow(Math.sin(ratio2 - .2),2)*35);
        var lum = Math.round(50 + Math.pow(Math.sin(ratio2 - .2),2)*10);
        var alpha = Math.sin(Math.PI*ratio) * 1.5 * (band? .2 : .5);
        arch(ctx, hslaColor(hue,sat,lum,alpha), cx, cy, band * bandDistance + outerRad - i);
      }
    }
  }
})