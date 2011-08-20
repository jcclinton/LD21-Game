game.unit = {};
game.unit.factory = (function(){
	var me = {}
		, intLayer
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
		intLayer = new CanvasNode();
		canvas.append(intLayer);
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
			;

		map = game.unit.map[name];

		if(!map){
			console.warn('map key: ' + name + ' does not exist');
			return;
		}

		//debugger;

		myGreatConstructor.prototype = new game.unit.shapes(name, game.canvas, options.shapes || {});


		me.extend(myGreatConstructor.prototype, game.unit.unitBase);


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



		defaults = {
			isMe: true,
			selected: false
		};

		initData = me.extend({}, defaults, map.init || {});

		for(key in defaults){
			obj.data[key] =  initData[key];
		}
		obj.data.id = me.getNextId();

		intLayer.append(obj.scene);

		return obj;
	};


	return me;

})();