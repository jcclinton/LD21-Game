game.unit.unitBase = function(){
	var me = {};

	me.data = {range: 3};

	me.destroy = function(){
		this.scene.removeSelf();
		game.unit.factory.unitList.remove(this.data.id);
		if(this.data.isGuard){
			--game.jail.guardCount;
		}
	};

	me.setWaypoints = function(wp){
		var ar = []
			, i
			, l
			;

		for(i = 0, l = wp.length; i < l; i++){
			if(wp[i]){
				ar.push(wp[i]);
			}
		}
		this.data.wp = ar;
	};

	me.popWaypoint = function(){
		if(this.data.wp && this.data.wp.length > 0){
			return this.data.wp.shift();
		}
		return false;
	};

	me.getExit = function(){
		return {x: game.board.width, y: game.board.height/2};
	};

	me.isAtExit = function(){
		var u = this
			, exit = this.getExit()
			, x = exit.x
			, y = exit.y
			, r = 60
			;

		return this.hasArrived(x,y, r);
	};

	me.actualMove = function(){
		var u = this
			, r = u.data.range
			, pos = u.data.nextPos
			;

		if(pos.x > this.shape.x){
			this.shape.x += r;
		}else{
			this.shape.x -= r;
		}

		if(pos.y > this.shape.y){
			this.shape.y += r;
		}else{
			this.shape.y -= r;
		}

		if(this.hasArrived(pos.x, pos.y)){
			u.data.nextPos = null;
		};
	};

	me.hasArrived = function(x, y, r){
		var r =  r || this.data.range
			;
		return( Math.abs(this.shape.x - x) < r && Math.abs(this.shape.y - y) < r );
	};

	me.hasSomewhereToGo = function(){
		var u = this
			, pos = u.data.nextPos
			, path = u.data.nextPath
			, next
			, wp
			, startx
			, starty
			, endx
			, endy
			, exit
			, nodes = game.board.graph.nodes
			;

		if(pos){
			return true;
		}



		if(path && path.length > 0){
			next = path.shift();
			u.data.nextPos = {x: 10*next.x, y: 10*next.y};
			return true;
		}


		// only inmates have waypoints, everyone else can just leave
		if(!u.data.isInmate){
			return false;
		}



		wp = this.popWaypoint();

		if(wp){

			startx = this.shape.x / 10;
			starty = this.shape.y / 10;
			endx = wp.x / 10;
			endy = wp.y / 10;

			endx = endx | 0;
			endy = endy | 0;
			startx = startx | 0;
			starty = starty | 0;

			u.data.nextPos = null;

			try{
				start = nodes[startx][starty];
				end = nodes[endx][endy];
				result = astar.search(nodes, start, end);
				u.data.nextPath = result;
				if(u.data.nextPath && u.data.nextPath.length > 0){
					u.data.arrived = false;
					next = u.data.nextPath.shift();
					u.data.nextPos = {x: 10*next.x, y: 10*next.y};
					return true;
				}
			} catch(e){
				console.warn('UNIT MOVE: '+e);
				return false;
			}
		}

		if(this.isAtExit()){
			this.destroy();
			game.score++;
			document.getElementById('score').innerHTML = 'Score: '+game.score;
		}

		exit = this.getExit();

		this.setWaypoints( [{x: exit.x - 10, y: exit.y - 50}] );

		return false;


	};

	me.moveUnit = function(){
		if(this.hasSomewhereToGo()){
			this.actualMove();
		}
	};






	return me;
};