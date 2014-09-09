if (false || typeof window.console === "undefined") {
	window.console = {
		log : function() {
		}
	}
}

var ie10 = {
	version : "0.1.0",

	main : function() {
		var p1 = new ie10.IE10Map();
		p1.init();
		console.log(p1.getMap());
	}
}

ie10.IE10Map = function() {
	this.map = {};
	this.centerMarker = {};
};

ie10.IE10Map.prototype = {

	getMap : function() {
		return this.map;
	},

	init : function() {
		var latlng = new google.maps.LatLng(35.709984, 139.810703);
		var opts = {
			zoom : 15,
			center : latlng,
			mapTypeId : google.maps.MapTypeId.ROADmap
		};
		this.browserOptimize();

		this.map = new google.maps.Map(document.getElementById("map_canvas"),
				opts);
		this.markSkyTree(this.map);

		var latlng = this.map.getCenter();
		var centerMarker = new google.maps.Marker({
			position : new google.maps.LatLng(latlng),
			draggable : false,
			map : this.map,
			title : "CENTER HERE!"
		});
		var dragendAction = this.dispLatLng(this.map, centerMarker);
		google.maps.event.addListener(this.map, "dragend", dragendAction);
	},

	browserOptimize : function() {
		var useragent = navigator.userAgent;
		var mapdiv = document.getElementById("map_canvas");
		var isMobileDevice = useragent.indexOf("iPhone") !== -1
				|| useragent.indexOf('Android') !== -1;
		if (true || isMobileDevice) {
			mapdiv.style.width = '100%';
			mapdiv.style.height = '100%';
		} else {
			mapdiv.style.width = '600px';
			mapdiv.style.height = '800px';
		}
	},

	markSkyTree : function(map) {
		var x = 35.709984;
		var y = 139.810703;
		var markers = new Array();

		for (var i = 0; i < 5; i++) {
			var adx = (0.001 * i);
			for (var j = 0; j < 5; j++) {
				var ady = (0.001 * j);
				markers.push(new google.maps.Marker({
					position : new google.maps.LatLng(x + adx, y + ady),
					icon : "http://www.yahoo.co.jp/favicon.ico",
					draggable : false,
					map : map,
					title : "Hello World!"
				}));
			}
		}
	},

	dispLatLng : function(_map, centerMarker) {
		var actionFunc = function() {
			var latlng = _map.getCenter();
			var str = "[CENTER]=[" + latlng.lat() + "," + latlng.lng()
					+ "]<br />";

			var latlngBounds = _map.getBounds();
			var swLatlng = latlngBounds.getSouthWest();
			str = str + "[SouthWest]=[" + swLatlng.lat() + "," + swLatlng.lng()
					+ "]<br />";

			var neLatlng = latlngBounds.getNorthEast();
			str = str + "[NorthEast]=[" + neLatlng.lat() + "," + neLatlng.lng()
					+ "]";

			console.log(str);
			centerMarker.position = _map.getCenter();
			centerMarker.setMap(_map);
		}
		return actionFunc;
	},

	setStyle : function() {
		var styleArray = [ {
			featureType : "all",
			stylers : [ {
				saturation : -80
			} ]
		}, {
			featureType : "road.arterial",
			elementType : "geometry",
			stylers : [ {
				hue : "#00ffee"
			}, {
				saturation : 50
			} ]
		}, {
			featureType : "poi.business",
			elementType : "labels",
			stylers : [ {
				visibility : "off"
			} ]
		} ];

		this.map.setOptions({
			styles : styleArray
		});
	}
};
