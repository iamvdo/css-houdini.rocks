var Point = {
  x: 0, // used to draw
  y: 0,
  ox: 0, // origin
  oy: 0,
  targetX: 0, // For bounciness
  targetY: 0,
  maxX: 0,
  maxY: 0,
  dist: 0,
  maxDist: 0,
  velocityX: 0,
  velocityY: 0,
  
  update: function(x, y) {
    var dx = x - this.ox,
        dy = y - this.oy;
    this.dist = Math.sqrt(dx * dx + dy * dy);
    if(this.dist < this.maxDist) {
      var distRatio = 1 - (this.dist / this.maxDist);
      this.targetX = this.ox + ((this.maxX - this.ox) * distRatio);
      this.targetY = this.oy + ((this.maxY - this.oy) * distRatio);
    }
    else {
      this.targetX = this.ox;
      this.targetY = this.oy;
    }
    var accelerationX = (this.targetX - this.x) * this.spring;
    this.velocityX += accelerationX;
    this.velocityX *= this.friction;
    this.x += this.velocityX;

    var accelerationY = (this.targetY - this.y) * this.spring;
    this.velocityY += accelerationY;
    this.velocityY *= this.friction;
    this.y += this.velocityY;
  }
};

var Bouncy = function(params) {
  this.drawFill = params.drawFill;
  this.x = 0;
  this.y = 0;
  this.radius = params.radius;
  this.number = params.number;
  this.startAngle = params.startAngle * Math.PI / 180;
  
  this.lineWidth = params.lineWidth;
  this.backgroundColor = params.backgroundColor;
  this.fillStyle = params.fillColor;
  this.strokeStyle = params.color;
  this.points = [];

  var maxDist = params.maxDist * this.radius;
  /*
  for(var i = 0; i < this.number; i++) {
    var p = Object.create(Point);

    // Circular distribution
    console.log('point', (Math.PI / 4) * (i+1));
    p.x = p.ox = p.targetX = this.radius * Math.cos((Math.PI / 4) * (i+1));
    p.y = p.oy = p.targetY = this.radius * Math.sin((Math.PI / 4) * (i+1));
    console.log(p.x, p.y);
    // Max target for the point
    p.maxX = Math.cos((Math.PI / 4) * (i+1)) * maxDist;
    p.maxY = Math.sin((Math.PI / 4) * (i+1)) * maxDist;
    
    p.maxDist = maxDist;
    p.friction = params.friction;
    p.spring = params.spring;
    this.points.push(p);
  }
  */

  for (var angle = this.startAngle; angle < Math.PI * 2 + this.startAngle; angle += (Math.PI * 2 / this.number)) {
    
    var p = Object.create(Point);
    p.x = p.ox = p.targetX = this.radius * Math.cos(angle);
    p.y = p.oy = p.targetY = this.radius * Math.sin(angle);
    p.maxX = Math.cos(angle) * maxDist;
    p.maxY = Math.sin(angle) * maxDist;
    p.maxDist = maxDist;
    p.friction = params.friction;
    p.spring = params.spring;
    this.points.push(p);
  }


};

Bouncy.prototype.update = function(ctx, geom, params, mouse) {
  ctx.fillStyle = this.backgroundColor;
  ctx.fillRect(0, 0, geom.width, geom.height);
  ctx.save();
  ctx.translate(this.x, this.y);
  //ctx.rotate(45 * Math.PI / 180);
  ctx.lineWidth = params.lineWidth;
  ctx.fillStyle = params.fillColor;
  ctx.strokeStyle = params.color;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  ctx.beginPath();

  var mouseX = mouse.x - this.x,
      mouseY = mouse.y - this.y;
  
  var firstPoint = this.points[0];
  
  // Link all points to the next one
  for(var i = 0; i < this.points.length; i++) {
    var p = this.points[i];
    p.update(mouseX, mouseY);
    ctx.lineTo(p.x, p.y);
  }

  ctx.lineTo(firstPoint.x, firstPoint.y);
  if(this.drawFill) ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};



registerPaint('wobble', class Wobble {

  constructor() {
    this.params = {
      color: '#fff',
      fillColor: 'orangered',
      backgroundColor: 'transparent',
      number: 4,
      startAngle: 45,
      lineWidth: 5,
      radius: 50,
      maxDist: 1.2,
      drawFill: true,
      spring: 0.06,
      friction: 0.96
    };
  }

  static get inputProperties() {
    return [
      '--mouse-x',
      '--mouse-y',
      '--tick',
      '--border-width'
    ]
  }

  static get inputArguments() {
    return [
      '<color>'
    ]
  }

  paint(ctx, geom, properties, args) {

    const borderWidth = properties.get('--border-width').value;
    const radius = Math.max(geom.height, geom.width);

    const color = args[0]
    this.params.fillColor = color

    this.params.radius = radius / 2;

    if (!this.circle) {
      this.circle = new Bouncy(this.params);
    }

    this.circle.x = geom.width / 2;
    this.circle.y = geom.height / 2;

    var mouse = {
      x: properties.get('--mouse-x').toString(),
      y: properties.get('--mouse-y').toString()
    };
    mouse.x = mouse.x == 0 ? geom.width / 2 : mouse.x;
    mouse.y = mouse.y == 0 ? geom.height / 2 : mouse.y;

    const tick = properties.get('--tick').toString();

    this.circle.update(ctx, geom, this.params, mouse);

  }

})