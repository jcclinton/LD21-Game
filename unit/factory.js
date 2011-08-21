game.unit = {};
game.unit.factory = (function(){
	var me = {}
		, unitLayer
		;



	me.getNextId = (function(){
		// all the units are over 9000!!
		var id = 9000;
		return function(){
			return ++id;
		};
	})();

	me.extend = function(obj){
		for(var i = 1, l = arguments.length; i < l; i++){
			var arg = arguments[i];
			if(arg){
				for(var e in arg){
					obj[e] = arg[e];
				}
			}
		}
		return obj;
	};

	me.effect = Klass({
	  initialize : function(canvas) {
	    this.canvas = canvas;
	    this.scene = new CanvasNode();
	    this.scene.effect = this;
	  }
	});

	me.init = function(canvas){
		unitLayer = new CanvasNode();
		unitLayer.desc = "Unit Layer";
		canvas.append(unitLayer);
	};

	me.append = function(node){
		unitLayer.append(node);
	};

	me.spawn = function(name, options){

		var key
			, defaults
			, obj
			, map
			, myGreatConstructor = function(){}
			, model
			, layer
			, initData = {}
			, tempObj = {}
			, i
			, l
			, id
			;

		map = game.unit.map[name];

		if(!map){
			console.warn('map key: ' + name + ' does not exist');
			return;
		}

		myGreatConstructor.prototype = new game.unit.shapes(name, game.canvas, options.shapes || {});


		me.extend(myGreatConstructor.prototype, game.unit.unitBase());


		// extend base objects
		//me.extend( myGreatConstructor.prototype, parent );

		// loop through all game-specific objects this should extend
		if(map.extending !== void 0){
			for(i = 0, l = map.extending.length; i < l; i++){
				if( map.extending[i] !== void 0 && game.unit[ map.extending[i] ] ){
					me.extend( myGreatConstructor.prototype, game.unit[ map.extending[i] ] );
				}else{
					console.warn(map.extending[i] + ' does not exist');
				}
			}
		}


		obj = new myGreatConstructor();

		obj.shape.unit = obj;


		defaults = {
			isMe: false
		};

		initData = me.extend({}, defaults, map.init || {});

		for(key in defaults){
			obj.data[key] =  initData[key];
		}
		if(options.data !== void 0){
			for(key in options.data){
				obj.data[key] =  options.data[key];
			}
		}

		unitLayer.append(obj.scene);


		me.unitList.add(obj.shape.id, obj);

		if(options.data.isMe){
			game.hero = obj;
		}

		return obj;
	};


	me.unitList = (function(){
		var lst = {
			"table": {}
		};

		lst.add = function(id, obj) {
			return (lst.table[id] = obj);
		};

		lst.remove = function(id) {
			return delete lst.table[id];
		};

		lst.get = function(id) {
			return lst.table[id]?lst.table[id]:false;
		};

		lst.getAll = function() {
			return lst.table;
		};

		lst.selected = null;

		return lst;
	}());


	return me;

})();