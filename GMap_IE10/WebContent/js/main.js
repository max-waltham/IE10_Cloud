var map;
var IE10 = {
	centerMarker : undefined,
	initialize : function() {
		var latlng = new google.maps.LatLng(35.709984, 139.810703);
		var opts = {
			zoom : 15,
			center : latlng,
			mapTypeId : google.maps.MapTypeId.ROADmap
		};
		IE10.browserOptimize();

		map = new google.maps.Map(document.getElementById("map_canvas"), opts);
		IE10.markSkyTree(map);

		var latlng = map.getCenter();
		IE10.centerMarker = new google.maps.Marker({
			position : new google.maps.LatLng(latlng),
			draggable : false,
			map : map,
			title : "CENTER HERE!"
		});

		google.maps.event.addListener(map, 'dragend', IE10.dispLatLng);

	},

	browserOptimize : function() {
		var useragent = navigator.userAgent;
		var mapdiv = document.getElementById("map_canvas");
		var isMobileDevice = useragent.indexOf('iPhone') != -1
				|| useragent.indexOf('Android') != -1;
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

	dispLatLng : function() {
		var latlng = map.getCenter();
		var str = "[CENTER]=[" + latlng.lat() + "," + latlng.lng() + "]<br />";

		var latlngBounds = map.getBounds();
		var swLatlng = latlngBounds.getSouthWest();
		str = str + "[SouthWest]=[" + swLatlng.lat() + "," + swLatlng.lng()
				+ "]<br />";

		var neLatlng = latlngBounds.getNorthEast();
		str = str + "[NorthEast]=[" + neLatlng.lat() + "," + neLatlng.lng()
				+ "]";

		console.log(str);
		IE10.centerMarker.position = map.getCenter();
		IE10.centerMarker.setMap(map);
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

		map.setOptions({
			styles : styleArray
		});
	}
}
