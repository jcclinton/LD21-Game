game.jail = (function(){
	var me = {};

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
					console.log(i);

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

	me.spawnConvict = function(){
		var u
			, x = 0
			, y = game.board.height / 2
			, options = { data:{isMe: false, isConvict: true}, shapes:{x: x, y: y} }
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
			endx = game.board.exit.x / 10  - 1 | 0;
			endy = (game.board.exit.y - 50) / 10 | 0;
			startx = x / 10 | 0;
			starty = y / 10 | 0;

			start = nodes[startx][starty];
			end = nodes[endx][endy];
			result = astar.search(nodes, start, end);
			u.data.nextPath = result;
		}catch(e){
			console.warn('ASTAR: ' + e);
		}


		u.scene.after(1500, function(){
			me.spawnConvict();
		});
	};


	return me;
}());