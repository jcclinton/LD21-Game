game.unit.unitBase = function(){
	var me = {};

	me.data = {range: 3}

	me.checkPath = function(){
		var path = this.unit.data.nextPath
			, pos = this.unit.data.nextPos
			, d = this.unit.data.range
			, next
			;

			if(!path || !path.length){
				return;
			}

			if(pos){
				if( Math.abs(pos.x - this.x) > d || Math.abs(pos.y - this.y) > d ){
					return;
				}
			}

			next = path.shift();


			this.unit.data.nextPos = {x: 10*next.x, y: 10*next.y};

	};

	me.moveUnit = function(){
		var u = this.unit.data.nextPos
			, d = this.unit.data.range
			;

		if( !u ){
			return;
		}

		if( Math.abs(this.x - u.x) < d && Math.abs(this.y - u.y) < d ){
			return;
		}

		if(u.x > this.x){
			this.x += d;
		}else{
			this.x -= d;
		}

		if(u.y > this.y){
			this.y += d;
		}else{
			this.y -= d;
		}

		if(this.line){
			this.line.x1 = this.x;
			this.line.y1 = this.y;
		}
	};

	return me;
};