game.jail = (function(){
	var me = {};

	me.guardCount = 0;
	me.guardLimit = 50;

	// debug
	me.spawnGuards = true;
	me.spawnConvicts = true;

	me.createLines = function(x, y){
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
					, l = me['line'+j];
					;

				l.x1 = e.x;
				l.x2 = e.x;
				l.y1 = e.y;
				l.y2 = e.y;
				game.jail.selected = j;

				return false;
			});
		}
	};

	me.moveBox = function(num, x, y){
		var box = this['box'+num]
			;

			box.x = x - 18;
			box.y = y - 33;
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
			, d = 50
			, t = 1500
			;

		if(me.spawnGuards !== true || me.guardCount >= me.guardLimit){
			setTimeout(function(){
				me.spawnGuard();
			}, t);
			return;
		}

		x = game.board.width - 10
		y = game.board.height / 2
		options = { shapes:{x: x, y: y} }

		u = game.unit.factory.spawn('guard', options);
		me.guardCount++;


		nextx = game.board.width - (Math.random()*200 + 50)
		nexty = Math.random() * game.board.height

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
			if(u.data.nextPath){
				u.data.arrived = false;
				next = u.data.nextPath.shift();
				u.data.nextPos = {x: 10*next.x, y: 10*next.y};
			}

		}catch(e){
			console.warn('ASTAR: ' + e);
		}


		u.scene.after(t, function(){
			me.spawnGuard();
		});

	};

	me.spawnConvict = function(){
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
			;

		if(me.spawnConvicts !== true){
			setTimeout(function(){
				me.spawnConvict();
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
			if(u.data.nextPath){
				u.data.arrived = false;
				next = u.data.nextPath.shift();
				u.data.nextPos = {x: 10*next.x, y: 10*next.y};
			}

		}catch(e){
			console.warn('ASTAR: ' + e);
		}


		u.scene.after(1500, function(){
			me.spawnConvict();
		});
	};


	return me;
}());