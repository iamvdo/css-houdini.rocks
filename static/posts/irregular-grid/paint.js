// seeded random number generator for Javascript
// https://github.com/davidbau/seedrandom
!function(a,b){function c(c,j,k){var n=[];j=1==j?{entropy:!0}:j||{};var s=g(f(j.entropy?[c,i(a)]:null==c?h():c,3),n),t=new d(n),u=function(){for(var a=t.g(m),b=p,c=0;a<q;)a=(a+c)*l,b*=l,c=t.g(1);for(;a>=r;)a/=2,b/=2,c>>>=1;return(a+c)/b};return u.int32=function(){return 0|t.g(4)},u.quick=function(){return t.g(4)/4294967296},u.double=u,g(i(t.S),a),(j.pass||k||function(a,c,d,f){return f&&(f.S&&e(f,t),a.state=function(){return e(t,{})}),d?(b[o]=a,c):a})(u,s,"global"in j?j.global:this==b,j.state)}function d(a){var b,c=a.length,d=this,e=0,f=d.i=d.j=0,g=d.S=[];for(c||(a=[c++]);e<l;)g[e]=e++;for(e=0;e<l;e++)g[e]=g[f=s&f+a[e%c]+(b=g[e])],g[f]=b;(d.g=function(a){for(var b,c=0,e=d.i,f=d.j,g=d.S;a--;)b=g[e=s&e+1],c=c*l+g[s&(g[e]=g[f=s&f+b])+(g[f]=b)];return d.i=e,d.j=f,c})(l)}function e(a,b){return b.i=a.i,b.j=a.j,b.S=a.S.slice(),b}function f(a,b){var c,d=[],e=typeof a;if(b&&"object"==e)for(c in a)try{d.push(f(a[c],b-1))}catch(a){}return d.length?d:"string"==e?a:a+"\0"}function g(a,b){for(var c,d=a+"",e=0;e<d.length;)b[s&e]=s&(c^=19*b[s&e])+d.charCodeAt(e++);return i(b)}function h(){try{var b;return j&&(b=j.randomBytes)?b=b(l):(b=new Uint8Array(l),(k.crypto||k.msCrypto).getRandomValues(b)),i(b)}catch(b){var c=k.navigator,d=c&&c.plugins;return[+new Date,k,d,k.screen,i(a)]}}function i(a){return String.fromCharCode.apply(0,a)}var j,k=this,l=256,m=6,n=52,o="random",p=b.pow(l,m),q=b.pow(2,n),r=2*q,s=l-1;if(b["seed"+o]=c,g(b.random(),a),"object"==typeof module&&module.exports){module.exports=c;try{j=require("crypto")}catch(a){}}else"function"==typeof define&&define.amd&&define(function(){return c})}([],Math);

registerPaint('irregular-grid', class {
    static get inputProperties() {
        return [
            '--width',
            '--id',
            '--items',
            '--items-width',
            '--seed',
            '--border-width',
            '--irregular-grid-x',
            '--irregular-grid-y'
        ];
    }
    paint(ctx, geom, properties) {
        const seed = properties.get('--seed').toString();
        Math.seedrandom(seed);
        const parentWidth = Number(properties.get('--width').toString());
        const itemsWidth = Number(properties.get('--items-width').toString());
        const id = properties.get('--id').toString();
        const borderWidth = Number(properties.get('--border-width').toString());
        const nbColumns = Math.floor(parentWidth / itemsWidth);
        const nbItems = Number(properties.get('--items').toString());
        const nbLines = Math.ceil(nbItems / nbColumns);
        const aleaX = Number(properties.get('--irregular-grid-x').toString());
        const aleaY = Number(properties.get('--irregular-grid-y').toString());
        const aleaStrokeMin = 0;
        const aleaStrokeMax = 0;

        const lines = [];
        for (let x = 0; x <= nbLines; x++) {
          const line = [];
          for (let y = 0; y <= nbColumns; y++) {
            const rx = (Math.random() * 2 - 1) * aleaX;
            const ry = (Math.random() * 2 - 1) * aleaY;
            const aStroke = getRandomInt(aleaStrokeMin, aleaStrokeMax);
            const alea = [
                { x: rx - aStroke, y: ry - aStroke },
                { x: rx + aStroke, y: ry - aStroke },
                { x: rx + aStroke, y: ry + aStroke },
                { x: rx - aStroke, y: ry + aStroke }
            ];
            line.push({ x: rx, y: ry, a: alea });
          }
          lines.push(line)
        }

        // draw correct mask for this id
        // which line/column
        const line = Math.floor(id / nbColumns);
        const column = id - (line * nbColumns);

        const pts = [
            lines[line][column],
            lines[line][column+1],
            lines[line+1][column+1],
            lines[line+1][column]
        ];

        if (column === 0) {
            pts[0].a[2].x = 0;
            pts[3].a[1].x = 0;
        }
        if (column === nbColumns - 1) {
            pts[1].a[3].x = 0;
            pts[2].a[0].x = 0;
        }

        const w = geom.width - borderWidth;
        const h = geom.height - borderWidth;

        ctx.beginPath();
        ctx.moveTo(pts[0].a[2].x + borderWidth, pts[0].a[2].y + borderWidth);
        ctx.lineTo(w + pts[1].a[3].x, pts[1].a[3].y + borderWidth);
        ctx.lineTo(w + pts[2].a[0].x, h + pts[2].a[0].y);
        ctx.lineTo(pts[3].a[1].x + borderWidth, h + pts[3].a[1].y);
        ctx.lineTo(pts[0].a[2].x + borderWidth, pts[0].a[2].y + borderWidth);
        ctx.fill();

    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}