

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
			, options = {data:{}, shapes:{}}
			, u
			, tl
			;

			options.data.isMe = true;

		for(i = 0; i < 1; i++){
			shape = i % 2 ? 'ellipse' : 'circle';
			u = game.unit.factory.spawn(shape,options);
			u.shape.x = game.board.width / 3;
			u.shape.y = game.board.height / 2;
		}
	},0);


};