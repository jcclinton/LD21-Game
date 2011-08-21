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
			, layer
			, initData = {}
			, i
			, l
			, id
			, klass
			;

		map = game.unit.map[name];
		klass = map.klass;

		if(!map){
			console.warn('map key: ' + name + ' does not exist');
			return;
		}

		myGreatConstructor.prototype = new game.unit.shapes(klass, game.canvas, options.shapes || {});


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
		map.init = map.init || {};
		options.data = options.data || {};

		me.extend(initData, defaults, map.init, options.data);

		for(key in initData){
			obj.data[key] =  initData[key];
		}

		obj.data.id = me.getNextId();

		unitLayer.append(obj.scene);


		me.unitList.add(obj.data.id, obj);

		return obj;
	};


	me.unitList = (function(){
		var lst = {
			"table": {},
			"guards": {},
			"inmates": {}
		};

		lst.add = function(id, obj) {
			if(obj.data.isGuard){
				lst.guards[id] = obj;
			}else if(obj.data.isConvict){
				lst.inmates[id] = obj;
			}
			return (lst.table[id] = obj);
		};

		lst.remove = function(id) {
			var obj =lst.table[id];
			if(!obj) return;

			if(obj.data.isConvict){
				delete lst.inmates[id];
			}else if(obj.data.isGuard){
				delete lst.guards[id];
			}

			return delete lst.table[id];
		};

		lst.get = function(id) {
			return lst.table[id]?lst.table[id]:false;
		};

		return lst;
	}());


	return me;

})();