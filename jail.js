game.jail = (function(){
	var me = {};

	me.guardCount = 0;
	me.guardLimit = 100;

	// debug
	me.spawnGuards = true;
	me.spawnInmates = true;

	me.createLines = function(x, y){
		if(!game.hero){
			return;
		}

		me.line1 = new Line(25, game.board.height/2, x, y);
		game.hero.scene.append(me.line1);
		me.line1.stroke = true;

		me.line2 = new Line(-100, -100, -100, -100);
		game.hero.scene.append(me.line2);
		me.line2.stroke = true;

		me.line3 = new Line(-100, -100, -100, -100);
		game.hero.scene.append(me.line3);
		me.line3.stroke = true;

		me.waypoints = [];
	};

	me.createBoxes = function(x, y){
		var boxLayer = new CanvasNode()
			, i
			;
		boxLayer.desc = 'box layer';

		this.box1 = new Rectangle(25, 25, {x:-100, y:y});
		this.box1.desc = "box1";
		this.box1.stroke = '#00aa00';
		boxLayer.append(this.box1);

		this.box2 = new Rectangle(25, 25, {x:-100, y:y});
		this.box2.desc = "box2";
		this.box2.stroke = '#00aa00';
		boxLayer.append(this.box2);

		game.canvas.append(boxLayer);

		for(i = 1; i <= 2; i++){
			bindBox(i);
		}

		function bindBox(i){
			me['box'+i].when('mousedown', function(e){
				var j = i + 1
					, l = me['line'+j]
					, x1 = e.offsetX || e.layerX || e.x
					, y1 = e.offsetY || e.layerY || e.y
					;

				if(i >= 1){
					x1 = me['line'+i].x2;
					y1 = me['line'+i].y2;
				}

				l.x1 = x1;
				l.x2 = x1;
				l.y1 = y1;
				l.y2 = y1;
				game.jail.selected = j;

				return false;
			});
		}
	};

	me.moveBox = function(num, x, y){
		var box = this['box'+num]
			;

			box.x = x;
			box.y = y;
	};

	me.spawnGuard = function(){
		var u
			, x
			, y
			, options
			, nextx
			, nexty
			, endx
			, endy
			, startx
			, starty
			, start
			, end
			, result
			, nodes = game.board.graph.nodes
			, next
			, d = 70
			, t = 300
			, gradient
			;

		if(me.spawnGuards !== true || me.guardCount >= me.guardLimit){
			setTimeout(function(){
				me.spawnGuard();
			}, t);
			return;
		}

		gradient = {
	    type : 'radial',
	    endRadius : 15,
	    colorStops : [
	      [ 0.0, "rgba(100,195,90,1)" ],
	      [ 0.2, "rgba(80,10,5,0.4)" ],
	      [ 1, "rgba(10,0,40,0)" ]
	    ]
	  };

		x = game.board.width - 10;
		//y = game.board.height / 2;
		y = Math.random() * game.board.height;
		if(y < d) y = d;
		if(y > game.board.width - d) y = game.board.width - d;


		options = { shapes:{x: x, y: y, gradient: gradient} };

		u = game.unit.factory.spawn('guard', options);
		me.guardCount++;


		nextx = Math.random() * game.board.width;
		while(nextx < game.board.safex){
			nextx = Math.random() * game.board.width;
		}

		nexty = Math.random() * game.board.height;

		if(nextx < d) nextx = d;
		if(nextx > game.board.width - d) nextx = game.board.width - d;

		if(nexty < d) nexty = d;
		if(nexty > game.board.height - d) nexty = game.board.height - d;

		endx = nextx / 10;
		endy = nexty / 10;

		startx = u.shape.x / 10;
		starty = u.shape.y / 10;

		endx = endx | 0;
		endy = endy | 0;
		startx = startx | 0;
		starty = starty | 0;

		try{
			start = nodes[startx][starty];
			end = nodes[endx][endy];
			result = astar.search(nodes, start, end);
			u.data.nextPath = result;
			if(u.data.nextPath && u.data.nextPath.length > 0){
				next = u.data.nextPath.shift();
				u.data.nextPos = {x: 10*next.x, y: 10*next.y};

				setTimeout(function(){
					u.destroy();
				}, u.data.dieTime);
			}else{
				console.warn('guard breakage');
				u.destroy();
			}

		}catch(e){
			console.warn('ASTAR: ' + e);
		}

		setTimeout(function(){
			me.spawnGuard();
		});
	};





















	me.spawnInmate = function(){
		var u
			, x
			, y
			, options
			, endx
			, endy
			, startx
			, starty
			, start
			, end
			, result
			, nodes
			, next
			, t = 1500
			;

		if(me.spawnInmates !== true){
			setTimeout(function(){
				me.spawnInmate();
			}, t);
			return;
		}

		x = 0;
		y = game.board.height / 2;

		options = { shapes:{x: x, y: y} };

		u = game.unit.factory.spawn('inmate', options);

		endx = game.board.exit.x / 10  - 1;
		endy = (game.board.exit.y - 50) / 10;

		if(me.waypoints){
			u.setWaypoints(me.waypoints);
			coords = u.popWaypoint();
			if(coords){
				endx = coords.x / 10;
				endy = coords.y / 10;
			}
		}

		startx = x / 10;
		starty = y / 10;

		endx = endx | 0;
		endy = endy | 0;
		startx = startx | 0;
		starty = starty | 0;

		nodes = game.board.graph.nodes;

		try{
			start = nodes[startx][starty];
			end = nodes[endx][endy];
			result = astar.search(nodes, start, end);
			u.data.nextPath = result;
			if(u.data.nextPath && u.data.nextPath.length > 0){
				next = u.data.nextPath.shift();
				u.data.nextPos = {x: 10*next.x, y: 10*next.y};
			}else{
				console.warn('inmate breakage');
				u.destroy();
			}

		}catch(e){
			console.warn('ASTAR: ' + e);
		}

		setTimeout(function(){
			me.spawnInmate();
		}, t);
	};


	return me;
}());