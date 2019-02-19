/* eslint-disable */
module.exports = () => {

  // loaded
  const el = document.getElementById('el');
  el.classList.add('is-loaded');

  ;['justify-items', 'align-items', 'justify-self', 'align-self', 'path'].forEach(type => {
    document.getElementById(type).addEventListener('input', (e) => {
      let value = e.target.value
      let el = document.querySelector('.el')
      if (type === 'justify-self' || type === 'align-self') {
        el = document.querySelector('.el :nth-child(3)')
      }
      if (type === "path") {
        if (value.endsWith('z')) {
          el.style.setProperty('--path-loop', 'loop');
        } else {
          el.style.setProperty('--path-loop', 'no-loop');
        }
        value = 'path("' + value + '")'
        document.querySelector('#svg-' + type).style.setProperty('d', value);
        drawGuides();
      }
      el.style.setProperty('--' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })

  buttonAdd.addEventListener('click', e => {
    let fakeText = '.';
    let rd = Math.max(3, Math.floor(Math.random() * 10));
    for (var i = 0; i < rd; i++) {
      fakeText += '.'
    }
    let item = document.createElement('div');
    item.innerHTML = '<div><strong>' + (el.children.length + 1) + '.</strong>' + fakeText + '</div>';
    el.appendChild(item)
  })
  buttonRemove.addEventListener('click', e => {
    if (el.children.length > 5) {
      el.removeChild(el.children[el.children.length - 1])
    }
  })


  const e = Math.PI / 180
  const t = 180 / Math.PI
  const a = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi
  const r = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
  const n = /(^[#\.]|[a-y][a-z])/gi
  const o = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
  const c = function(t, r) {
      var o, n, i, a, s, h, f = Math.ceil(Math.abs(r) / 90),
        g = 0,
        u = [];
      for (t *= e, r *= e, o = r / f, n = 4 / 3 * Math.sin(o / 2) / (1 + Math.cos(o / 2)), h = 0; f > h; h++) i = t + h * o, a = Math.cos(i), s = Math.sin(i), u[g++] = a - n * s, u[g++] = s + n * a, i += o, a = Math.cos(i), s = Math.sin(i), u[g++] = a + n * s, u[g++] = s - n * a, u[g++] = a, u[g++] = s;
      return u
  }
  const p = function(r, o, n, i, a, s, h, f, g) {
      if (r !== f || o !== g) {
        n = Math.abs(n), i = Math.abs(i);
        var u = a % 360 * e,
          d = Math.cos(u),
          l = Math.sin(u),
          p = (r - f) / 2,
          C = (o - g) / 2,
          m = d * p + l * C,
          S = -l * p + d * C,
          w = n * n,
          x = i * i,
          y = m * m,
          _ = S * S,
          v = y / w + _ / x;
        v > 1 && (n = Math.sqrt(v) * n, i = Math.sqrt(v) * i, w = n * n, x = i * i);
        var b = s === h ? -1 : 1,
          M = (w * x - w * _ - x * y) / (w * _ + x * y);
        0 > M && (M = 0);
        var A = b * Math.sqrt(M),
          T = A * (n * S / i),
          O = A * -(i * m / n),
          N = (r + f) / 2,
          L = (o + g) / 2,
          D = N + (d * T - l * O),
          q = L + (l * T + d * O),
          z = (m - T) / n,
          G = (S - O) / i,
          R = (-m - T) / n,
          P = (-S - O) / i,
          k = Math.sqrt(z * z + G * G),
          B = z;
        b = 0 > G ? -1 : 1;
        var E = b * Math.acos(B / k) * t;
        k = Math.sqrt((z * z + G * G) * (R * R + P * P)), B = z * R + G * P, b = 0 > z * P - G * R ? -1 : 1;
        var V = b * Math.acos(B / k) * t;
        !h && V > 0 ? V -= 360 : h && 0 > V && (V += 360), V %= 360, E %= 360;
        var F, j, Q, I = c(E, V),
          Y = d * n,
          X = l * n,
          W = l * -i,
          H = d * i,
          U = I.length - 2;
        for (F = 0; U > F; F += 2) j = I[F], Q = I[F + 1], I[F] = j * Y + Q * W + D, I[F + 1] = j * X + Q * H + q;
        return I[I.length - 2] = f, I[I.length - 1] = g, I
      }
      }

  const C = function(e){var t,o,n,i,s,h,f,g,u,d,c,C,m,S=(e+"").replace(a,function(e){var t=+e;return 1e-4>t&&t>-1e-4?0:t}).match(r)||[],w=[],x=0,y=0,_=S.length,v=2,b=0;if(!e||!isNaN(S[0])||isNaN(S[1]))return l("ERROR: malformed path data: "+e),w;for(t=0;_>t;t++)if(m=s,isNaN(S[t])?(s=S[t].toUpperCase(),h=s!==S[t]):t--,n=+S[t+1],i=+S[t+2],h&&(n+=x,i+=y),0===t&&(g=n,u=i),"M"===s)f&&f.length<8&&(w.length-=1,v=0),x=g=n,y=u=i,f=[n,i],b+=v,v=2,w.push(f),t+=2,s="L";else if("C"===s)f||(f=[0,0]),f[v++]=n,f[v++]=i,h||(x=y=0),f[v++]=x+1*S[t+3],f[v++]=y+1*S[t+4],f[v++]=x+=1*S[t+5],f[v++]=y+=1*S[t+6],t+=6;else if("S"===s)"C"===m||"S"===m?(d=x-f[v-4],c=y-f[v-3],f[v++]=x+d,f[v++]=y+c):(f[v++]=x,f[v++]=y),f[v++]=n,f[v++]=i,h||(x=y=0),f[v++]=x+=1*S[t+3],f[v++]=y+=1*S[t+4],t+=4;else if("Q"===s)d=n-x,c=i-y,f[v++]=x+2*d/3,f[v++]=y+2*c/3,h||(x=y=0),x+=1*S[t+3],y+=1*S[t+4],d=n-x,c=i-y,f[v++]=x+2*d/3,f[v++]=y+2*c/3,f[v++]=x,f[v++]=y,t+=4;else if("T"===s)d=x-f[v-4],c=y-f[v-3],f[v++]=x+d,f[v++]=y+c,d=x+1.5*d-n,c=y+1.5*c-i,f[v++]=n+2*d/3,f[v++]=i+2*c/3,f[v++]=x=n,f[v++]=y=i,t+=2;else if("H"===s)i=y,f[v++]=x+(n-x)/3,f[v++]=y+(i-y)/3,f[v++]=x+2*(n-x)/3,f[v++]=y+2*(i-y)/3,f[v++]=x=n,f[v++]=i,t+=1;else if("V"===s)i=n,n=x,h&&(i+=y-x),f[v++]=n,f[v++]=y+(i-y)/3,f[v++]=n,f[v++]=y+2*(i-y)/3,f[v++]=n,f[v++]=y=i,t+=1;else if("L"===s||"Z"===s)"Z"===s&&(n=g,i=u,f.closed=!0),("L"===s||Math.abs(x-n)>.5||Math.abs(y-i)>.5)&&(f[v++]=x+(n-x)/3,f[v++]=y+(i-y)/3,f[v++]=x+2*(n-x)/3,f[v++]=y+2*(i-y)/3,f[v++]=n,f[v++]=i,"L"===s&&(t+=2)),x=n,y=i;else if("A"===s){if(C=p(x,y,1*S[t+1],1*S[t+2],1*S[t+3],1*S[t+4],1*S[t+5],(h?x:0)+1*S[t+6],(h?y:0)+1*S[t+7]))for(o=0;o<C.length;o++)f[v++]=C[o];x=f[v-2],y=f[v-1],t+=7}else l("Error: malformed path data: "+e);return w.totalPoints=b+v,w}
  const E = function (e,t,r) {var i,a,h="string"==typeof e;return(!h||n.test(e)||(e.match(o)||[]).length<3)&&(i=h?s.selector(e):e&&e[0]?e:[e],i&&i[0]?(i=i[0],a=i.nodeName.toUpperCase(),t&&"PATH"!==a&&(i=B(i,!1),a="PATH"),e=i.getAttribute("PATH"===a?"d":"points")||"",i===r&&(e=i.getAttributeNS(null,"data-original")||e)):(l("WARNING: invalid morph to: "+e),e=!1)),e}

  const pathDataToBezier=function(e,t){var r,o,n,i,a,h,f,g,u=C(E(e,!0))[0]||[],d=0;if(t=t||{},g=t.align||t.relative,i=t.matrix||[1,0,0,1,0,0],a=t.offsetX||0,h=t.offsetY||0,"relative"===g||g===!0?(a-=u[0]*i[0]+u[1]*i[2],h-=u[0]*i[1]+u[1]*i[3],d="+="):(a+=i[4],h+=i[5],g&&(g="string"==typeof g?s.selector(g):g&&g[0]?g:[g],g&&g[0]&&(f=g[0].getBBox()||{x:0,y:0},a-=f.x,h-=f.y))),r=[],n=u.length,i&&"1,0,0,1,0,0"!==i.join(","))for(o=0;n>o;o+=2)r.push({x:d+(u[o]*i[0]+u[o+1]*i[2]+a),y:d+(u[o]*i[1]+u[o+1]*i[3]+h)});else for(o=0;n>o;o+=2)r.push({x:d+(u[o]+a),y:d+(u[o+1]+h)});return r}

  const svg = document.getElementById('svg');

  const path = document.getElementById('svg-path');
  const guidePoints = document.getElementById('points');
  const guideControlPoints = document.getElementById('controlPoints');
  const guideControlPolylines = document.getElementById('controlPolylines');

  let points = [];

  function draw (first = true) {
    let pathStr = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i <= points.length; i += 3) {
      addPoint(i, points[i], first)
      if (points[i+1]) {
        pathStr += `C${points[i+1].x},${points[i+1].y},${points[i+2].x},${points[i+2].y},${points[i+3].x},${points[i+3].y}`;
        //path.setAttribute('d', pathStr);
        path.style.setProperty('d', 'path("' + pathStr + '")')
        document.getElementById('el').style.setProperty('--path', 'path("' + pathStr + '")');
        addControlPoints(i, points[i], points[i+1], points[i+2], points[i+3], first);
      }
    }
  }
  function addPoint (i, point, first) {
    let p;
    if (first) {
      p = document.createElementNS('http://www.w3.org/2000/svg','circle');
    } else {
      p = document.querySelector('[data-i="' + i + '"]');
    }
    p.setAttribute('cx', point.x);
    p.setAttribute('cy', point.y);
    p.setAttribute('r', 25);
    p.setAttribute('data-i', i);

    guidePoints.appendChild(p);
  }
  function addControlPoints (i, point, point1, point2, nextPoint, first) {
    let p, p1, p2, np, l1, l2;
    if (first) {
      p1 = document.createElementNS('http://www.w3.org/2000/svg','circle');
      p2 = document.createElementNS('http://www.w3.org/2000/svg','circle');
      l1 = document.createElementNS('http://www.w3.org/2000/svg','polyline');
      l2 = document.createElementNS('http://www.w3.org/2000/svg','polyline');
    } else {
      p1 = document.querySelector('[data-i="' + (i+1) + '"]');
      p2 = document.querySelector('[data-i="' + (i+2) + '"]');
      l1 = document.querySelector('[data-li="' + i + '"]');
      l2 = document.querySelector('[data-li="' + (i+1) + '"]');
    }
    p1.setAttribute('cx', point1.x);
    p1.setAttribute('cy', point1.y);
    p1.setAttribute('r', 15);
    p1.setAttribute('data-i', i+1);

    p2.setAttribute('cx', point2.x);
    p2.setAttribute('cy', point2.y);
    p2.setAttribute('r', 15);
    p2.setAttribute('data-i', i+2);

    l1.setAttribute('points', `${point.x},${point.y} ${point1.x},${point1.y}`);
    l1.setAttribute('data-li', i);
    l2.setAttribute('points', `${point2.x},${point2.y} ${nextPoint.x},${nextPoint.y}`);
    l2.setAttribute('data-li', i+1);

    guideControlPoints.appendChild(p1);
    guideControlPoints.appendChild(p2);
    guideControlPolylines.appendChild(l1);
    guideControlPolylines.appendChild(l2);

  }
  function drawGuides () {

    guidePoints.innerHTML = '';
    guideControlPoints.innerHTML = '';
    guideControlPolylines.innerHTML = '';

    points = pathDataToBezier(getComputedStyle(path).getPropertyValue('d').replace("path(\"", "").replace("\")", ""));

    draw(true);

  }

  drawGuides();

  let ptDrag = null;
  svg.addEventListener('pointerdown', e => {
    const bbox = svg.getBoundingClientRect();
    const scale = bbox.width / 1000;
    const t = e.target;
    if (t.getAttribute('data-i')) {
      t.scale = scale;
      t.start = {
        x: points[t.getAttribute('data-i')].x,
        y: points[t.getAttribute('data-i')].y
      };
      t.mouse = t.mouse || {};
      t.mouse.start = {
        x: e.clientX / t.scale,
        y: e.clientY / t.scale
      };
      t.mouse.delta = t.mouse.delta || {x: 0, y: 0};
      ptDrag = t;
    } else {
      ptDrag = null;
    }
  });
  svg.addEventListener('pointermove', e => {
    if (ptDrag != null) {
      ptDrag.mouse.delta = {
        x: e.clientX / ptDrag.scale - ptDrag.mouse.start.x,
        y: e.clientY / ptDrag.scale - ptDrag.mouse.start.y
      };
      points[ptDrag.getAttribute('data-i')].x = ptDrag.start.x + ptDrag.mouse.delta.x;
      points[ptDrag.getAttribute('data-i')].y = ptDrag.start.y + ptDrag.mouse.delta.y;
      draw(false);
    }
  });
  svg.addEventListener('pointerup', e => {
    if(ptDrag != null) {
      ptDrag = null;
    }
  });

}
