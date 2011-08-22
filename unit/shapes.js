
game.unit.shapes = Klass({
  controls : [
    'stroke',
    'fill',
    'blur'
  ],
  stroke : false,
  fill : true,

  shapeGradient : {
    type : 'radial',
    endRadius : 15,
    colorStops : [
      [ 0.0, "rgba(100,195,90,1)" ],
      [ 0.2, "rgba(5,10,80,0.4)" ],
      [ 1, "rgba(10,0,40,0)" ]
    ]
  },

  params: {
  	circle: ['radius'],
  	ellipse: ['radiusx', 'radiusy'],
  	rectangle: ['width', 'height'],
  	line: ['x1','y1','x2','y2']
  },












  initialize : function(shapeType, canvas, params) {
    var shape;

    if(!this['get'+shapeType]){
    	console.warn('bad shape: ' + shapeType + ' passed into shape wrapper');
    	return;
    }


    this.shape = shape = this['get'+shapeType](params);
		shape.desc = shapeType + '_'+ shape.id;


    this.canvas = canvas;
    this.scene = new CanvasNode();
    this.scene.effect = this;
		this.scene.append(shape);



		shape.addFrameListener( this.shapeControl );


    this.scene.strokeWidth = 3;
    this.scene.rotation = [0.05, this.canvas.width/2, this.canvas.height/2];
    this.scene.compositeOperation = 'lighter';
    this.scene.fill = new Gradient(params.gradient || this.shapeGradient);
    this.scene.stroke = '#ffeeaa';

		this.scene.when('keydown', function(ev) {
	 		ev.preventDefault()}
		);
		this.scene.when('keypress', function(ev) {
			 ev.preventDefault()}
		 );
		this.scene.when('keyup', function(ev) {
			 ev.preventDefault()}
		 );

		this.scene.when('mousedown', function(e){
			var id
				, unit
				, x
				, y
				, line
				, ex = e.offsetX || e.layerX || e.x
				, ey = e.offsetY || e.layerY || e.y
				;

			unit = e.canvasTarget.unit;
			if(!unit.data.isMe){
				return false;
			}

			x = shape.x;
			y = shape.y;

			unit.data.selected = true;

			if(!shape.line){
				shape.line = new Line(shape.x, shape.y, ex, ey);
				this.append(shape.line);
			}
			shape.line.stroke = true;


			return false;
		});


		this.scene.when('mouseup', function(e){
			if(shape.line){
				shape.line.stroke = false;
			}
		});
  },

shapeControl: function(t){
	var guards
		, inmates
		, heroDist = game.heroDist
		, guardDist = game.guardDist
		, id
		, x
		, y
		, gx
		, gy
		;

	// first use hero to kill guards
	if(this.unit.data.isMe){
		guards = game.unit.factory.unitList.guards;
		for(id in guards){
			x = this.x;
			y = this.y;
			gx = guards[id].shape.x;
			gy = guards[id].shape.y;
			if(Math.abs(gx - x) < heroDist && Math.abs(gy - y) < heroDist){
				guards[id].destroy();
			}
		}
	}else if(this.unit.data.isGuard){
		// then use guards to kill inmates
		inmates = game.unit.factory.unitList.inmates;
		for(id in inmates){
			x = this.x;
			y = this.y;
			gx = inmates[id].shape.x;
			gy = inmates[id].shape.y;
			if(Math.abs(gx - x) < guardDist && Math.abs(gy - y) < guardDist){
				inmates[id].destroy();
			}
		}
	}

	this.unit.moveUnit.call(this.unit);

	if(this.unit.data.isMe){

		var el = document.getElementById('time');
		if(el){
			el.innerHTML = 'Time Remaining: ' + game.timeLeft--;
		}
		if(game.timeLeft < 0){
			game.canvas.stop();
		}
		var d = this.unit.data.range;
		if ( this.root.keys.left )
			this.x -= d;
		if ( this.root.keys.right )
			this.x += d;
		if (this.root.keys.up )
			this.y -= d;
		if (this.root.keys.down )
			this.y += d;

		if(this.line){
			this.line.x1 = this.x;
			this.line.y1 = this.y;
		}


    this.scale = 2.5+Math.cos(this.offset*Math.PI*4 + t/400);
	}
	this.fill = this.shapes.fill;
	this.stroke = this.shapes.stroke;
 },















  getcircle: function(params){
  	var defaults
  		, shape
  		, key
  		, options = {}
  		;

		params = params || {};

		defaults = {
			offset: 4 * Math.PI,
			radius: 15,
			x: 0,
			y: 100
		}

		for(key in defaults){
			options[key] = params[key] ? params[key] : defaults[key];
		}

    shape = new Circle(options.radius);
    shape.shapes = this;
   	shape.offset = options.offset;
		shape.y = options.y;
		shape.x = options.x;

		return shape;
  },

  getellipse: function(params){
  	var defaults
  		, shape
  		, key
  		, options = {}
  		;

		params = params || {};

		defaults = {
			offset: 4 * Math.PI,
			radiusx: 15,
			radiusy: 5,
			x: 0,
			y: 100
		}

		for(key in defaults){
			options[key] = params[key] ? params[key] : defaults[key];
		}

    shape = new Ellipse(options.radiusx, options.radiusy);
    shape.shapes = this;
   	shape.offset = options.offset;
		shape.y = options.y;
		shape.x = options.x;

		return shape;
  }
})