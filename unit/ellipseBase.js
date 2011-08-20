
game.unit.ellipse = Klass({
  controls : [
    'stroke',
    'fill',
    'blur'
  ],
  stroke : false,
  fill : true,

  circleGradient : {
    type : 'radial',
    endRadius : 15,
    colorStops : [
      [ 0.0, "rgba(100,195,90,1)" ],
      [ 0.2, "rgba(5,10,80,0.4)" ],
      [ 1, "rgba(10,0,40,0)" ]
    ]
  },

  initialize : function(canvas) {
		var num = 1
			, offset =  4 * Math.PI
			;

    game.unit.factory.effect.initialize.call(this, canvas);


    var circle = new Ellipse(15, 5);
    circle.circles = this;
   	circle.offset = offset;
		circle.y = 100;

		circle.when('focus', function(){
			this.focused = true;
		});
		circle.when('blur', function(){
			this.focused = false;
		});

		circle.addFrameListener( this.circleControl );

		this.scene.append(circle);

    this.scene.strokeWidth = 3
    this.scene.rotation = [0.05, this.canvas.width/2, this.canvas.height/2]
    this.scene.compositeOperation = 'lighter'
    this.scene.fill = new Gradient(this.circleGradient)
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

circleControl: function(t){
	if(this.focused){
	var d = 1
	 if ( this.root.keys.left )
		 this.x -= d
	 if ( this.root.keys.right )
		 this.x += d
	 if (this.root.keys.up )
		 this.y -= d
	 if (this.root.keys.down )
		 this.y += d

    this.scale = 1.5+Math.cos(this.offset*Math.PI*4 + t/1600)
	}
	this.fill = this.circles.fill
	this.stroke = this.circles.stroke
 },

  circleMotion : function(t) {
    this.fill = this.circles.fill
    this.stroke = this.circles.stroke
    var trw = this.root.width+160
    this.x = -50 + ((t/15 + (this.offset / (4*Math.PI) * trw)) % trw)
    this.y = this.root.height*0.5 + Math.sin(this.offset + t/400) * 20
    this.scale = 1.5+Math.cos(this.offset*Math.PI*4 + t/1600)
  }
})