game.unit.unitBase = function(){
	var me = {};

	me.data = {}

	me.checkPath = function(){
		var path = this.unit.data.nextPath
			, pos = this.unit.data.nextPos
			, next
			;

			if(!path || !path.length){
				return;
			}

			if(pos){
				if(pos.x !== this.x || pos.y !== this.y){
					return;
				}
			}

			next = path.shift();


			this.unit.data.nextPos = {x: 10*next.x, y: 10*next.y};

	};

	me.moveUnit = function(){
		var u = this.unit.data.nextPos
			;

		if( !u ){
			return;
		}

		if(u.x === this.x && u.y === this.y){
			return;
		}

		if(u.x > this.x){
			this.x += 1;
		}else{
			this.x -= 1;
		}

		if(u.y > this.y){
			this.y += 1;
		}else{
			this.y -= 1;
		}

		this.line.x1 = this.x;
		this.line.y1 = this.y;
	};

	return me;
};