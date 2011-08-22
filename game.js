var game = (function(){
	var me = {};

	me.data = {};



	me.init = function(){
		var canvas
			, board
			, t
			, textLayer = new CanvasNode()
			, elem
			, elem2
			, score
			, time
			;

		me.timeLeft = 2500;
		me.timeBump = 150;
		me.heroDist = 75;
		me.guardDist = 40;
		me.inmateSpawnTime = 1200;
		me.guardSpawnTime = 1500;
		me.timeMod = 0.9;

		board = this.board = gameboard.create();

		canvas = this.canvas = new Canvas(document.body, this.board.width, this.board.height);

		game.unit.factory.init(canvas);

		gameboard.draw(board, canvas);

  	canvas.fill = 'rgba(0,0,0, 0.1)';



		game.score = 0;

    elem = E('h1', { id: 'score' });
    elem.appendChild(T('Score: ' + this.score));
    score = new ElementNode(elem, {
      color: 'gray', x: 100, y: 500, zIndex: 1002, align: 'left', cursor: 'default'
    });


    elem2 = E('h1', { id: 'time' });
    elem2.appendChild(T('Time Remaining: ' + me.timeLeft));
    time = new ElementNode(elem2, {
      color: 'gray', x: 100, y: 535, zIndex: 1002, align: 'left', cursor: 'default'
    });

		textLayer.desc = "text layer";
		canvas.append(textLayer);
		textLayer.append(score);
		textLayer.append(time);


		canvas.when('mousemove', function(e){
			var u = game.hero
				, j = game.jail.selected
				;

			if(u && u.data.selected){
				u.shape.line.x1 = u.shape.x;
				u.shape.line.y1 = u.shape.y;
				u.shape.line.x2 = e.x;
				u.shape.line.y2 = e.y;
			}

			if(j){
				game.jail['line'+j].x2 = e.x;
				game.jail['line'+j].y2 = e.y;
			}
		});


		canvas.when('mousedown', function(e){
			game.hero.data.selected= null;
		});

		canvas.when('mouseup', function(e){
			var x = e.offsetX || e.layerX || e.x
				, y = e.offsetY || e.layerY || e.y
				, startx
				, starty
				, endx
				, endy
				, start
				, end
				, result
				, i
				;

			if(game.hero && game.hero.data.selected){
				try{
					endx = x / 10 | 0;
					endy = y / 10 | 0;
					startx = game.hero.shape.x / 10 | 0;
					starty = game.hero.shape.y / 10 | 0;

					start = board.graph.nodes[startx][starty];
					end = board.graph.nodes[endx][endy];
					result = astar.search(board.graph.nodes, start, end);
					game.hero.data.nextPath = result;
				}catch(e){
					game.hero.shape.line.stroke = false;
					console.warn('ASTAR: ' + e);
				}

				game.hero.data.selected = null;
			}

			if(game.jail.selected){
				if(!game.jail.box1 || !game.jail.box2){
					game.jail.createBoxes(x, y);
				}
				if(game.jail.selected <= 3){
					if(game.jail.selected <= 2){
						game.jail.moveBox(game.jail.selected, x, y);

						i = game.jail.selected;
						while(++i <=3){
							if(game.jail.waypoints[i]){
								delete game.jail.waypoints[i];
							}
						}
					}
					game.jail.waypoints[game.jail.selected] = {x: x, y: y};
				}
				if(game.jail.selected === 2){
					game.jail.line3.x1 = -100;
					game.jail.line3.x2 = -100;
					game.jail.line3.y1 = -100;
					game.jail.line3.y2 = -100;
				}
				game.jail.selected = null;
			}
		});
  };

  return me;
}());



