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
				if( Math.abs(pos.x - this.x) >= d || Math.abs(pos.y - this.y) >= d ){
					return;
				}
			}

			next = path.shift();


			this.unit.data.nextPos = {x: 10*next.x, y: 10*next.y};

	};

	me.moveUnit = function(){
		var d = this.unit.data
			, u = d.nextPos
			, r = d.range
			;

		if( !u ){
			return;
		}

		if( Math.abs(this.x - u.x) < r && Math.abs(this.y - u.y) < r ){
			if( d.isConvict && (!d.nextPath || d.nextPath.length <= 0) ){
				this.unit.scene.removeSelf();
				game.score++;
				document.getElementById('score').innerHTML = 'Score: '+game.score;
			}
				this
			return;
		}

		if(u.x > this.x){
			this.x += r;
		}else{
			this.x -= r;
		}

		if(u.y > this.y){
			this.y += r;
		}else{
			this.y -= r;
		}

		if(this.line){
			this.line.x1 = this.x;
			this.line.y1 = this.y;
		}
	};

	return me;
};