

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
			, tl
			;

		u = game.unit.factory.spawn('hero', options);
		u.shape.x = game.board.width / 3;
		u.shape.y = game.board.height / 2;

	},0);


};