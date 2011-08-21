game.jail = (function(){
	var me = {};

	me.spawnConvict = function(){
		var u
			, x = 0
			, y = game.board.height / 2
			, options = { isMe: false, shape:{x: x, y: y} }
			, endx
			, endy
			, startx
			, starty
			, start
			, end
			, result
			, nodes = game.board.graph.nodes
			;

			u = game.unit.factory.spawn('circle', options);


			try{
				endx = game.board.exit.x / 10  - 5 | 0;
				endy = game.board.exit.y / 10 | 0;
				startx = x / 10 | 0;
				starty = y / 10 | 0;

				start = nodes[startx][starty];
				end = nodes[endx][endy];
				result = astar.search(nodes, start, end);
				u.data.nextPath = result;
			}catch(e){
				console.warn('ASTAR: ' + e);
			}
	};


	return me;
}());