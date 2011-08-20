

window.onload = function()
{
	if( !document.createElement('canvas').getContext ){
		return true;
	}

	document.body.removeChild( document.getElementById('oldBrowser') );

	game.canvas = new Canvas(document.body, 1000, 600);
	game.init(game.canvas);

	game.unit.factory.init(game.canvas);


	var shape
		, i
		, options = {data:{}, shapes:{}}
		;

		options.data.isMe = true;

for(i = 0; i < 2; i++){
	shape = i % 2 ? 'ellipse' : 'circle';
	game.unit.factory.spawn(shape,options);
}

};