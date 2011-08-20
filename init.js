

window.onload = function()
{
	if( !document.createElement('canvas').getContext ){
		return true;
	}

	document.body.removeChild( document.getElementById('oldBrowser') );

	game.canvas = new Canvas(document.body, 1000, 600);
	game.init(game.canvas);

	game.unit.factory.init(game.canvas);


for(var i = 0; i < 1; i++)
game.unit.factory.spawn('ellipse');

};