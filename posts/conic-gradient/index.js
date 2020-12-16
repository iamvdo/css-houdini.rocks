/* eslint-disable */
module.exports = () => {
/**
 * StyleFix 1.0.3 & PrefixFree 1.0.7
 * @author Lea Verou
 * MIT license
 */(function(){function t(e,t){return[].slice.call((t||document).querySelectorAll(e))}if(!window.addEventListener)return;var e=window.StyleFix={link:function(t){try{if(t.rel!=="stylesheet"||t.hasAttribute("data-noprefix"))return}catch(n){return}var r=t.href||t.getAttribute("data-href"),i=r.replace(/[^\/]+$/,""),s=t.parentNode,o=new XMLHttpRequest,u;o.onreadystatechange=function(){o.readyState===4&&u()};u=function(){var n=o.responseText;if(n&&t.parentNode&&(!o.status||o.status<400||o.status>600)){n=e.fix(n,!0,t);if(i){n=n.replace(/url\(\s*?((?:"|')?)(.+?)\1\s*?\)/gi,function(e,t,n){return/^([a-z]{3,10}:|\/|#)/i.test(n)?e:'url("'+i+n+'")'});var r=i.replace(/([\\\^\$*+[\]?{}.=!:(|)])/g,"\\$1");n=n.replace(RegExp("\\b(behavior:\\s*?url\\('?\"?)"+r,"gi"),"$1")}var u=document.createElement("style");u.textContent=n;u.media=t.media;u.disabled=t.disabled;u.setAttribute("data-href",t.getAttribute("href"));s.insertBefore(u,t);s.removeChild(t);u.media=t.media}};try{o.open("GET",r);o.send(null)}catch(n){if(typeof XDomainRequest!="undefined"){o=new XDomainRequest;o.onerror=o.onprogress=function(){};o.onload=u;o.open("GET",r);o.send(null)}}t.setAttribute("data-inprogress","")},styleElement:function(t){if(t.hasAttribute("data-noprefix"))return;var n=t.disabled;t.textContent=e.fix(t.textContent,!0,t);t.disabled=n},styleAttribute:function(t){var n=t.getAttribute("style");n=e.fix(n,!1,t);t.setAttribute("style",n)},process:function(){t('link[rel="stylesheet"]:not([data-inprogress])').forEach(StyleFix.link);t("style").forEach(StyleFix.styleElement);t("[style]").forEach(StyleFix.styleAttribute)},register:function(t,n){(e.fixers=e.fixers||[]).splice(n===undefined?e.fixers.length:n,0,t)},fix:function(t,n,r){for(var i=0;i<e.fixers.length;i++)t=e.fixers[i](t,n,r)||t;return t},camelCase:function(e){return e.replace(/-([a-z])/g,function(e,t){return t.toUpperCase()}).replace("-","")},deCamelCase:function(e){return e.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()})}};(function(){setTimeout(function(){t('link[rel="stylesheet"]').forEach(StyleFix.link)},10);document.addEventListener("DOMContentLoaded",StyleFix.process,!1)})()})();(function(e){function t(e,t,r,i,s){e=n[e];if(e.length){var o=RegExp(t+"("+e.join("|")+")"+r,"gi");s=s.replace(o,i)}return s}if(!window.StyleFix||!window.getComputedStyle)return;var n=window.PrefixFree={prefixCSS:function(e,r,i){var s=n.prefix;n.functions.indexOf("linear-gradient")>-1&&(e=e.replace(/(\s|:|,)(repeating-)?linear-gradient\(\s*(-?\d*\.?\d*)deg/ig,function(e,t,n,r){return t+(n||"")+"linear-gradient("+(90-r)+"deg"}));e=t("functions","(\\s|:|,)","\\s*\\(","$1"+s+"$2(",e);e=t("keywords","(\\s|:)","(\\s|;|\\}|$)","$1"+s+"$2$3",e);e=t("properties","(^|\\{|\\s|;)","\\s*:","$1"+s+"$2:",e);if(n.properties.length){var o=RegExp("\\b("+n.properties.join("|")+")(?!:)","gi");e=t("valueProperties","\\b",":(.+?);",function(e){return e.replace(o,s+"$1")},e)}if(r){e=t("selectors","","\\b",n.prefixSelector,e);e=t("atrules","@","\\b","@"+s+"$1",e)}e=e.replace(RegExp("-"+s,"g"),"-");e=e.replace(/-\*-(?=[a-z]+)/gi,n.prefix);return e},property:function(e){return(n.properties.indexOf(e)?n.prefix:"")+e},value:function(e,r){e=t("functions","(^|\\s|,)","\\s*\\(","$1"+n.prefix+"$2(",e);e=t("keywords","(^|\\s)","(\\s|$)","$1"+n.prefix+"$2$3",e);return e},prefixSelector:function(e){return e.replace(/^:{1,2}/,function(e){return e+n.prefix})},prefixProperty:function(e,t){var r=n.prefix+e;return t?StyleFix.camelCase(r):r}};(function(){var e={},t=[],r={},i=getComputedStyle(document.documentElement,null),s=document.createElement("div").style,o=function(n){if(n.charAt(0)==="-"){t.push(n);var r=n.split("-"),i=r[1];e[i]=++e[i]||1;while(r.length>3){r.pop();var s=r.join("-");u(s)&&t.indexOf(s)===-1&&t.push(s)}}},u=function(e){return StyleFix.camelCase(e)in s};if(i.length>0)for(var a=0;a<i.length;a++)o(i[a]);else for(var f in i)o(StyleFix.deCamelCase(f));var l={uses:0};for(var c in e){var h=e[c];l.uses<h&&(l={prefix:c,uses:h})}n.prefix="-"+l.prefix+"-";n.Prefix=StyleFix.camelCase(n.prefix);n.properties=[];for(var a=0;a<t.length;a++){var f=t[a];if(f.indexOf(n.prefix)===0){var p=f.slice(n.prefix.length);u(p)||n.properties.push(p)}}n.Prefix=="Ms"&&!("transform"in s)&&!("MsTransform"in s)&&"msTransform"in s&&n.properties.push("transform","transform-origin");n.properties.sort()})();(function(){function i(e,t){r[t]="";r[t]=e;return!!r[t]}var e={"linear-gradient":{property:"backgroundImage",params:"red, teal"},calc:{property:"width",params:"1px + 5%"},element:{property:"backgroundImage",params:"#foo"},"cross-fade":{property:"backgroundImage",params:"url(a.png), url(b.png), 50%"}};e["repeating-linear-gradient"]=e["repeating-radial-gradient"]=e["radial-gradient"]=e["linear-gradient"];var t={initial:"color","zoom-in":"cursor","zoom-out":"cursor",box:"display",flexbox:"display","inline-flexbox":"display",flex:"display","inline-flex":"display"};n.functions=[];n.keywords=[];var r=document.createElement("div").style;for(var s in e){var o=e[s],u=o.property,a=s+"("+o.params+")";!i(a,u)&&i(n.prefix+a,u)&&n.functions.push(s)}for(var f in t){var u=t[f];!i(f,u)&&i(n.prefix+f,u)&&n.keywords.push(f)}})();(function(){function s(e){i.textContent=e+"{}";return!!i.sheet.cssRules.length}var t={":read-only":null,":read-write":null,":any-link":null,"::selection":null},r={keyframes:"name",viewport:null,document:'regexp(".")'};n.selectors=[];n.atrules=[];var i=e.appendChild(document.createElement("style"));for(var o in t){var u=o+(t[o]?"("+t[o]+")":"");!s(u)&&s(n.prefixSelector(u))&&n.selectors.push(o)}for(var a in r){var u=a+" "+(r[a]||"");!s("@"+u)&&s("@"+n.prefix+u)&&n.atrules.push(a)}e.removeChild(i)})();n.valueProperties=["transition","transition-property"];e.className+=" "+n.prefix;StyleFix.register(n.prefixCSS)})(document.documentElement);

  /**
 * CSS conic-gradient() polyfill
 * By Lea Verou — http://lea.verou.me
 * MIT license
 */

(function(){

var π = Math.PI;
var τ = 2 * π;
var ε = .00001;
var deg = π/180;

var dummy = document.createElement("div");
document.head.appendChild(dummy);

var _ = self.ConicGradient = function(o) {
  var me = this;
  _.all.push(this);

  o = o || {};

  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");

  this.repeating = !!o.repeating;

  this.size = o.size || Math.max(innerWidth, innerHeight);

  this.canvas.width = this.canvas.height = this.size;

  var stops = o.stops;

  this.stops = (stops || "").split(/\s*,(?![^(]*\))\s*/); // commas that are not followed by a ) without a ( first

  this.from = 0;

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

  if (this.stops[0].color.indexOf('from') == 0) {
    this.from = this.stops[0].pos*360;
    this.stops.shift();
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
  toString: function() {
    return "url('" + this.dataURL + "')";
  },

  get dataURL() {
    // IE/Edge only render data-URI based background-image when the image data
    // is escaped.
    // Ref: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/#comment-3
    return "data:image/svg+xml," + encodeURIComponent(this.svg);
  },

  get blobURL() {
    // Warning: Flicker when updating due to slow blob: URL resolution :(
    // TODO cache this and only update it when color stops change
    return URL.createObjectURL(new Blob([this.svg], {type: "image/svg+xml"}));
  },

  get svg() {
    return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">' +
      '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">' +
      '<image width="100" height="100%" xlink:href="' + this.png + '" /></svg></svg>';
  },

  get png() {
    return this.canvas.toDataURL();
  },

  get r() {
    return Math.sqrt(2) * this.size / 2;
  },

  // Paint the conical gradient on the canvas
  // Algorithm inspired from http://jsdo.it/akm2/yr9B
  paint: function() {
    var c = this.context;

    var radius = this.r;
    var x = this.size / 2;

    var stopIndex = 0; // The index of the current color
    var stop = this.stops[stopIndex], prevStop;

    var diff, t;

    // Transform coordinate system so that angles start from the top left, like in CSS
    c.translate(this.size/2, this.size/2);
    c.rotate(-90*deg);
    c.rotate(this.from*deg);
    c.translate(-this.size/2, -this.size/2);

    for (var i = 0; i < 360;) {
      if (i/360 + ε >= stop.pos) {
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

      var interpolated = sameColor? stop.color : diff.map(function(d,i){
        var ret = d * t + prevStop.color[i];

        return i < 3? ret & 255 : ret;
      });

      // Draw a series of arcs, 1deg each
      c.fillStyle = 'rgba(' + interpolated.join(",") + ')';
      c.beginPath();
      c.moveTo(x, x);

      if (sameColor) {
        var θ = 360 * (stop.pos - prevStop.pos);
      }
      else {
        var θ = .5;
      }

      var beginArg = i*deg;
      beginArg = Math.min(360*deg, beginArg);

      // .02: To prevent empty blank line and corresponding moire
      // only non-alpha colors are cared now
      var endArg = beginArg + θ*deg;
      endArg = Math.min(360*deg, endArg + .02);

      c.arc(x, x, radius, beginArg, endArg);

      c.closePath();
      c.fill();

      i += θ;
    }
  }
};

_.ColorStop = function(gradient, stop) {
  this.gradient = gradient;

  if (stop) {
    var parts = stop.match(/^(.+?)(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?\s*$/);

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
      else if (unit == "grad") {
        this.pos  = parts[2] / 400;
      }
      else if (unit == "rad") {
        this.pos  = parts[2] / τ;
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
  if (!Array.isArray(color) && color.indexOf("from") == -1) {
    dummy.style.color = color;

    var rgba = getComputedStyle(dummy).color.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);

    if (rgba) {
      rgba.shift();
      rgba = rgba.map(function(a) { return +a });
      rgba[3] = isNaN(rgba[3])? 1 : rgba[3];
    }

    return rgba || [0,0,0,0];
  }

  return color;
};

})();

if (self.StyleFix) {
  // Test if conic gradients are supported first:
  (function(){
    var dummy = document.createElement("p");
    dummy.style.backgroundImage = "conic-gradient(white, black)";
    dummy.style.backgroundImage = PrefixFree.prefix + "conic-gradient(white, black)";

    if (!dummy.style.backgroundImage) {
      // Not supported, use polyfill
      StyleFix.register(function(css, raw) {
        if (css.indexOf("conic-gradient") > -1) {
          css = css.replace(/(?:repeating-)?conic-gradient\(\s*((?:\([^()]+\)|[^;()}])+?)\)/g, function(gradient, stops) {
            return new ConicGradient({
              stops: stops,
              repeating: gradient.indexOf("repeating-") > -1
            });
          });
        }

        return css;
      });
    }
  })();
}

// loaded
el.classList.add('is-loaded');

// support old browsers
var gradient = new ConicGradient({
    stops: "red, magenta, blue, cyan, lime, yellow, red"
});

if (!CSS.supports('background', 'paint(id, foo)')) {
  el.style.background = 'url(' + gradient.dataURL + ')'
}

}
