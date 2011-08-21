

window.onload = function()
{
	if( !document.createElement('canvas').getContext ){
		return true;
	}

	document.body.removeChild( document.getElementById('oldBrowser') );

	setTimeout(function(){
		game.init();


		var shape
			, i
			, options = { shapes:{} }
			, u
			, r = 25
			;

			options.shapes.gradient = {
		    type : 'radial',
		    endRadius : r,
		    colorStops : [
		      [ 0.0, "rgba(100,195,90,1)" ],
		      [ 0.2, "rgba(5,10,80,0.4)" ],
		      [ 1, "rgba(10,0,40,0)" ]
		    ]
		  };
		  options.shapes.radius = r;

		u = game.unit.factory.spawn('hero', options);
		u.shape.x = game.board.width / 3;
		u.shape.y = game.board.height / 2;

		game.hero = u;

	},0);


};