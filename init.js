

window.onload = function()
{
	if( !document.createElement('canvas').getContext ){
		return true;
	}

	document.body.removeChild( document.getElementById('oldBrowser') );

	game.init();


	var shape
		, i
		, options = {data:{}, shapes:{}}
		, u
		, tl
		;

		options.data.isMe = true;

	for(i = 0; i < 5; i++){
		shape = i % 2 ? 'ellipse' : 'circle';
		u = game.unit.factory.spawn(shape,options);
		u.shape.x += i*100;
	}

	//u.moveTo(400, 400);

	/*tl = new Timeline(false);
	tl.addKeyframe(10, u.shape);

	u.shape.addTimeline(tl);*/


};