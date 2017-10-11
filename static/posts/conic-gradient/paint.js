
/**
 * Adapted for Houdini from Lea Verou's conic gradient polyfill.
 * https://leaverou.github.io/conic-gradient/
 */

var PI = Math.PI;
var EPSILON = .00001;
var DEGREE = Math.PI/180;

// var dummy = document.createElement("div");
// document.head.appendChild(dummy);

var ConicGradient;
var _ = ConicGradient = function(o) {
  var me = this;
  _.all.push(this);

  o = o || {};

  this.context = o.ctx;

  this.repeating = !!o.repeating;

  this.width = o.width;
  this.height = o.height;
  this.size = Math.max(o.width, o.height);

  var stops = o.stops;

  this.stops = (stops || "").split(/\s*,(?![^(]*\))\s*/); // commas that are not followed by a ) without a ( first

  for (var i=0; i<this.stops.length; i++) {
    if (this.stops[i]) {
      var stop = this.stops[i] = new _.ColorStop(this, this.stops[i]);

      if (stop.next) {
        this.stops.splice(i+1, 0, stop.next);
        i++;
      }
    }
    else {
      this.stops.splice(i, 1);
      i--;
    }
  }

  // Normalize stops

  // Add dummy first stop or set first stop’s position to 0 if it doesn’t have one
  if (this.stops[0].pos === undefined) {
      this.stops[0].pos = 0;
    }
  else if (this.stops[0].pos > 0) {
    var first = this.stops[0].clone();
    first.pos = 0;
    this.stops.unshift(first);
  }

  // Add dummy last stop or set first stop’s position to 100% if it doesn’t have one
  if (this.stops[this.stops.length - 1].pos === undefined) {
    this.stops[this.stops.length - 1].pos = 1;
  }
  else if (!this.repeating && this.stops[this.stops.length - 1].pos < 1) {
    var last = this.stops[this.stops.length - 1].clone();
    last.pos = 1;
    this.stops.push(last);
  }

  this.stops.forEach(function(stop, i){
    if (stop.pos === undefined) {
      // Evenly space color stops with no position
      for (var j=i+1; this[j]; j++) {
        if (this[j].pos !== undefined) {
          stop.pos = this[i-1].pos + (this[j].pos - this[i-1].pos)/(j-i+1);
          break;
        }
      }
    }
    else if (i > 0) {
      // Normalize color stops whose position is smaller than the position of the stop before them
      stop.pos = Math.max(stop.pos, this[i-1].pos);
    }
  }, this.stops);

  if (this.repeating) {
    // Repeat color stops until >= 1
    var stops = this.stops.slice();
    var lastStop = stops[stops.length-1];
    var difference = lastStop.pos - stops[0].pos;

    for (var i=0; this.stops[this.stops.length-1].pos < 1 && i<10000; i++) {
      for (var j=0; j<stops.length; j++) {
        var s = stops[j].clone();
        s.pos += (i+1)*difference;

        this.stops.push(s);
      }
    }
  }

  this.paint();
};

_.all = [];

_.prototype = {
  // toString: function() {
  //   return "url('" + this.dataURL + "')";
  // },

  // get dataURL() {
  //   // IE/Edge only render data-URI based background-image when the image data
  //   // is escaped.
  //   // Ref: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/#comment-3
  //   return "data:image/svg+xml," + encodeURIComponent(this.svg);
  // },

  // get blobURL() {
  //   // Warning: Flicker when updating due to slow blob: URL resolution :(
  //   // TODO cache this and only update it when color stops change
  //   return URL.createObjectURL(new Blob([this.svg], {type: "image/svg+xml"}));
  // },

  // get svg() {
  //   return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">' +
  //     '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">' +
  //     '<image width="100" height="100%" xlink:href="' + this.png + '" /></svg></svg>';
  // },

  // get png() {
  //   return this.canvas.toDataURL();
  // },

  get r() {
    return Math.sqrt(2) * this.size / 2;
  },

  // Paint the conical gradient on the canvas
  // Algorithm inspired from http://jsdo.it/akm2/yr9B
  paint: function() {
    var c = this.context;

    var radius = this.r;
    var x = this.width / 2;
    var y = this.height / 2;

    var stopIndex = 0; // The index of the current color
    var stop = this.stops[stopIndex], prevStop;

    var diff, t;

    // Transform coordinate system so that angles start from the top left, like in CSS
    c.translate(x, y);
    c.rotate(-90*DEGREE);
    c.translate(-x, -y);

    for (var i = 0; i < 360;) {
      if (i/360 + EPSILON >= stop.pos) {
        // Switch color stop
        do {
          prevStop = stop;

          stopIndex++;
          stop = this.stops[stopIndex];
        } while(stop && stop != prevStop && stop.pos === prevStop.pos);

        if (!stop) {
          break;
        }

        var sameColor = prevStop.color + "" === stop.color + "" && prevStop != stop;

        diff = prevStop.color.map(function(c, i){
          return stop.color[i] - c;
        });
      }

      t = (i/360 - prevStop.pos) / (stop.pos - prevStop.pos);

      var interpolated = sameColor ? stop.color : diff.map(function(d,i){
        var ret = d * t + prevStop.color[i];

        return i < 3 ? ret & 255 : ret;
      });

      // Draw a series of arcs, 1deg each
      c.fillStyle = 'rgba(' + interpolated.join(",") + ')';
      c.beginPath();
      c.moveTo(x, y);

      if (sameColor) {
        var THETA = 360 * (stop.pos - prevStop.pos);
      }
      else {
        var THETA = .5;
      }

      var beginArg = i*DEGREE;
      beginArg = Math.min(360*DEGREE, beginArg);

      // .02: To prevent empty blank line and corresponding moire
      // only non-alpha colors are cared now
      var endArg = beginArg + THETA*DEGREE;
      endArg = Math.min(360*DEGREE, endArg + .02);

      c.arc(x, y, radius, beginArg, endArg);

      c.closePath();
      c.fill();

      i += THETA;
    }
  }
};

_.ColorStop = function(gradient, stop) {
  this.gradient = gradient;

  if (stop) {
    var parts = stop.match(/^(.+?)(?:\s+([\d.]+)(%|deg|turn)?)?(?:\s+([\d.]+)(%|deg|turn)?)?\s*$/);

    this.color = _.ColorStop.colorToRGBA(parts[1]);

    if (parts[2]) {
      var unit = parts[3];

      if (unit == "%" || parts[2] === "0" && !unit) {
        this.pos = parts[2]/100;
      }
      else if (unit == "turn") {
        this.pos  = +parts[2];
      }
      else if (unit == "deg") {
        this.pos  = parts[2] / 360;
      }
    }

    if (parts[4]) {
      this.next = new _.ColorStop(gradient, parts[1] + " " + parts[4] + parts[5]);
    }
  }
}

_.ColorStop.prototype = {
  clone: function() {
    var ret = new _.ColorStop(this.gradient);
    ret.color = this.color;
    ret.pos = this.pos;

    return ret;
  },

  toString: function() {
    return "rgba(" + this.color.join(", ") + ") " + this.pos * 100 + "%";
  }
};

_.ColorStop.colorToRGBA = function(color) {
  if (!Array.isArray(color)) {
    // dummy.style.color = color;

    // var rgba = getComputedStyle(dummy).color.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);
    var rgba = color.match(/rgba?\(([\d.]+), ?([\d.]+), ?([\d.]+)(?:, ?([\d.]+))?\)/);

    if (rgba) {
      rgba.shift();
      rgba = rgba.map(function(a) { return +a });
      rgba[3] = isNaN(rgba[3])? 1 : rgba[3];
    }

    return rgba || [0,0,0,0];
  }

  return color;
};


registerPaint('conic-gradient', class {
  // static get inputProperties() {
  //   return [];
  // }
  static get inputArguments() {
    return [
      '<angle>+ | <percentage>+',
      '<color>+',
    ]
  }
  paint(ctx, geom, props, args) {
    const rgba = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-1]\.?\d*)\s*)?\)/g;
    const colors = [];
    const colorString = args
        .filter((arg) => !(arg.type == 'angle' || arg.type == 'percent'))
        .toString();

    let matches;
    while((matches = rgba.exec(colorString)) !== null) {
      const [match] = matches;
      colors.push(match);
    }

    const angles = args
        .filter((arg) => arg.type == 'angle' || arg.type == 'percent');

    const stops = [];
    for (let i = 0; i < angles.length; i++) {
      stops.push(`${colors[i]} ${angles[i]}`);
    }

    new ConicGradient({
      ctx: ctx,
      width: geom.width,
      height: geom.height,
      stops: stops.join(','),
    });
  }
});
