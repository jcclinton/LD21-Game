var game = (function(){
	var me = {};

	me.data = {};



	me.init = function(){
		var canvas
			, board
			;

		board = this.board = gameboard.create();

		canvas = this.canvas = new Canvas(document.body, this.board.width, this.board.height);

		game.unit.factory.init(canvas);

		gameboard.draw(board, canvas);

  	canvas.fill = 'rgba(0,0,0, 0.1)';


		canvas.when('mousemove', function(e){
			var u = game.unit.factory.unitList.selected
				;

			if(u){
				u.shape.line.x1 = u.shape.x;
				u.shape.line.y1 = u.shape.y;
				u.shape.line.x2 = e.x;
				u.shape.line.y2 = e.y;
			}
		});


		canvas.when('mousedown', function(e){
			game.unit.factory.unitList.selected = null;
		});

		canvas.when('mouseup', function(e){
			var x = e.x
				, y = e.y
				, startx
				, starty
				, endx
				, endy
				, start
				, end
				, result
				;

			if(game.unit.factory.unitList.selected){
				try{
					endx = x / 10 | 0;
					endy = y / 10 | 0;
					startx = game.unit.factory.unitList.selected.shape.x / 10 | 0;
					starty = game.unit.factory.unitList.selected.shape.y / 10 | 0;

					start = board.graph.nodes[startx][starty];
					end = board.graph.nodes[endx][endy];
					result = astar.search(board.graph.nodes, start, end);
					game.unit.factory.unitList.selected.data.nextPath = result;
				}catch(e){
					game.unit.factory.unitList.selected.shape.line.stroke = false;
					console.warn('ASTAR: ' + e);
				}

				game.unit.factory.unitList.selected = null;
			}
		});
  };

  return me;
}());



