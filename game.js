var game = (function(){
	var me = {};

	me.data = {};



	me.init = function(canvas){
  	canvas.fill = 'rgba(0,0,0, 0.1)';


		this.canvas.when('mousemove', function(e){
			var u = game.unit.factory.unitList.selected
				;

			if(u){
				u.shape.line.x1 = u.shape.x;
				u.shape.line.y1 = u.shape.y;
				u.shape.line.x2 = e.x;
				u.shape.line.y2 = e.y;
			}
		});


		this.canvas.when('mousedown', function(e){
			game.unit.factory.unitList.selected = null;
		});

		this.canvas.when('mouseup', function(e){
			game.unit.factory.unitList.selected = null;
		});
  };

  return me;
}());



