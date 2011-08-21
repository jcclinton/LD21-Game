game.unit.map = {


	"hero": {
		"klass": "circle",
		"init": {
			"range": 3,
			"isMe": true,
			"selected": false
		},
		"extending": [
		]
	},
	"inmate": {
		"klass": "circle",
		"init": {
			"isInmate": true
		},
		"extending": [
		]
	},
	"guard": {
		"klass": "ellipse",
		"init": {
			"range": 4,
			"isGuard": true,
			"dieTime": 20000
		},
		"extending": [
		]
	},

};