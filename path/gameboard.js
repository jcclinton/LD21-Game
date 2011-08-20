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

		return obj;
	};

	me.draw = function(obj, canvas){
		var boardLayer = new CanvasNode()
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
			, width
			;

		boardLayer.desc = "Board Layer";
		canvas.append(boardLayer);
		boardLayer.stroke = '#443300';


		outline = [
			{x1: 0, x2: obj.width, y1: 0, y2: 0},
			{x1: obj.width, x2: obj.width, y1: 0, y2: obj.height},
			{x1: 0, x2: obj.width, y1: obj.height, y2: obj.height},
			{x1: 0, x2: 0, y1: 0, y2: obj.height}
		];

		for(i = 0; i < outline.length; i++){
			o = outline[i];
			line = new Line(o.x1, o.y1, o.x2, o.y2);
			line.desc = "board outline_"+i;
			boardLayer.append(line);
		}

		//return;


		for(i = 0, w = obj.boardArray.length; i < w; i++){
			for(j = 0, h = obj.boardArray[i].length; j < h; j++){
				if(obj.boardArray[i][j]){
					im = 10*i;
					jm = 10*j;

					o = {x: im + 5, y: jm - 5};
					width = 10;

					rect = new Rectangle(width, height, o);
					line.desc = "rect_"+i+'_'+j;
					boardLayer.append(rect);

				}
			}
		}
	};



	function createBoard(){
		var i
			, j
			, w = width/unit
			, h = height/unit
			, inner
			, outer = []
			, v
			;

		for(i = 0; i < w; i++){
			inner = [];
			for(j = 0; j < h; j++){
				v = 0;
				if(i === 50 && j > 1){
					v = 1;
				}
				inner.push(v); // row
			}
			outer.push(inner); // column
		}

		return outer;
	}


	return me;
}());