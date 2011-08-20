
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


    shape = this['get'+shapeType](params);


    this.canvas = canvas;
    this.scene = new CanvasNode();
    this.scene.effect = this;
		this.scene.append(shape);



		shape.when('focus', function(){
			this.focused = true;
		});
		shape.when('blur', function(){
			this.focused = false;
		});

		shape.addFrameListener( this.shapeControl );


    this.scene.strokeWidth = 3
    this.scene.rotation = [0.05, this.canvas.width/2, this.canvas.height/2]
    this.scene.compositeOperation = 'lighter'
    this.scene.fill = new Gradient(params.gradient || this.shapeGradient)
    this.scene.stroke = '#ffeeaa'

		this.scene.when('keydown', function(ev) {
	 		ev.preventDefault()}
		)
		this.scene.when('keypress', function(ev) {
			 ev.preventDefault()}
		 )
		this.scene.when('keyup', function(ev) {
			 ev.preventDefault()}
		 )
  },

shapeControl: function(t){
	if(this.focused){
	var d = 1;
	 if ( this.root.keys.left )
		 this.x -= d;
	 if ( this.root.keys.right )
		 this.x += d;
	 if (this.root.keys.up )
		 this.y -= d;
	 if (this.root.keys.down )
		 this.y += d;

    this.scale = 1.5+Math.cos(this.offset*Math.PI*4 + t/1600);
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
			y: 100,
		};

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
			y: 100,
		};

		for(key in defaults){
			options[key] = params[key] ? params[key] : defaults[key];
		}

    shape = new Ellipse(options.radiusx, options.radiusy);
    shape.shapes = this;
   	shape.offset = options.offset;
		shape.y = options.y;
		shape.x = options.x;

		return shape;
  },

  getrectangle: function(params){
  	var defaults
  		, shape
  		, key
  		, options = {}
  		;

		params = params || {};

		defaults = {
			offset: 4 * Math.PI,
			w: 15,
			h: 5,
			x: 0,
			y: 100,
		};

		for(key in defaults){
			options[key] = params[key] ? params[key] : defaults[key];
		}

    shape = new Rectangle(options.w, options.h);
    shape.shapes = this;
   	shape.offset = options.offset;
		shape.y = options.y;
		shape.x = options.x;

		return shape;
  },

  getline: function(params){
  	var defaults
  		, shape
  		, key
  		, options = {}
  		;

		params = params || {};

		defaults = {
			offset: 4 * Math.PI,
			x1: 15,
			y1: 5,
			x2: 100,
			y2: 100,
		};

		for(key in defaults){
			options[key] = params[key] ? params[key] : defaults[key];
		}

    shape = new Line(options.x1, options.y1,options.x2, options.y2);
    shape.shapes = this;
   	shape.offset = options.offset;
		shape.y = options.y;
		shape.x = options.x;

		return shape;
  }
})