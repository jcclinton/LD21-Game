var gameboard = (function(){
	var me = {}
		, height = 600
		, width = 1000
		, unit = 10
		;

	me.create = function(){
		var obj = {};

		obj.width = width;
		obj.height = height;

		obj.boardArray = createBoard();
		obj.graph = new Graph(obj.boardArray);

		obj.exit = {x: width, y: height/2};
		obj.exitRange = 10;

		obj.safex = 0.2 * obj.width;

		return obj;
	};

	me.draw = function(obj, canvas){
		var boardLayer = new CanvasNode()
			, jailLayer = new CanvasNode()
			, line
			, i
			, w
			, j
			, h
			, x1
			, x2
			, y1
			, y2
			, jm
			, im
			, outline
			, o
			, rect
			;

		boardLayer.desc = "Board Layer";
		canvas.append(boardLayer);
		boardLayer.stroke = '#443300';


		outline = [
			{x1: 0, x2: obj.width, y1: 0, y2: 0},
			{x1: obj.width, x2: obj.width, y1: 0, y2: obj.height},
			{x1: 0, x2: obj.width, y1: obj.height, y2: obj.height},
			{x1: 0, x2: 0, y1: 0, y2: obj.height},
			{x1: obj.safex, x2: obj.safex, y1: 0, y2: obj.height},
			{x1: obj.width - obj.safex, x2: obj.width - obj.safex, y1: 0, y2: obj.height}
		];

		// board outline
		for(i = 0; i < outline.length; i++){
			o = outline[i];
			line = new Line(o.x1, o.y1, o.x2, o.y2);
			line.desc = "board outline_"+i;
			boardLayer.append(line);
		}

		if(false){
			//inner blocking rectangles
			for(i = 0, w = obj.boardArray.length; i < w; i++){
				for(j = 0, h = obj.boardArray[i].length; j < h; j++){
					if(obj.boardArray[i][j]){
						im = 10*i;
						jm = 10*j;

						// coordinates start at top left corner of rect
						// todo: fix this to work with the coords
						o = {x: im + 5, y: jm - 5};

						rect = new Rectangle(10, 10, o);
						line.desc = "rect_"+i+'_'+j;
						//boardLayer.append(rect);

					}
				}
			}
		}


		// exit
		w = 10
		o = {x: width - w, y: height/2 - 50};
		rect = new Rectangle(w, 50, o);
		rect.desc = "exit";
		boardLayer.append(rect);
		rect.stroke = '#00aa00';

		rect.after(2000, function(){
			game.jail.spawnGuard();
		});
		rect = null;
		o = null;


		jailLayer.desc = "Jail Layer";
		canvas.append(jailLayer);
		jailLayer.stroke = '#883300';

		// jail
		w = 50
		o = {x: 0, y: height/2 - w};
		rect = new Rectangle(w, 50, o);
		rect.desc = "jail";
		jailLayer.append(rect);
		//rect.stroke = '#1188aa';

		jailLayer.when('mousedown', function(e){
			if(!game.jail.line1){
				game.jail.createLines(e.x, e.y);
			}else{
				for(i = 2; i <= 3; i++){
					game.jail['line'+i].x1 = -100;
					game.jail['line'+i].x2 = -100;
					game.jail['line'+i].y1 = -100;
					game.jail['line'+i].y2 = -100;
				}
			}

			if(!game.jail.box1 || !game.jail.box2){
				game.jail.createBoxes(e.x, e.y);
			}
			game.jail.moveBox(1, -100, -100);
			game.jail.moveBox(2, -100, -100);
			game.jail.selected = 1;

			game.jail.points = [];
			return false;
		});

		rect.after(2000, function(){
			game.jail.spawnInmate();
		});

	};



	function createBoard(){
		var i
			, j
			, w = width/unit // 100
			, h = height/unit // 60
			, inner
			, outer = []
			, v
			, llimit = 40
			, rlimit = w - llimit
			, tlimit = 1
			, blimit = h - tlimit
			;

		for(i = 0; i < w; i++){
			inner = [];
			for(j = 0; j < h; j++){
				v = 0;
				if( false && (j > tlimit && j < blimit && i > llimit && i < rlimit) ){
					v = Math.random();
					v = v > 0.2 ? 0 : 1;
				}
				inner.push(v); // row
			}
			outer.push(inner); // column
		}

		return outer;
	}


	return me;
}());