define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('HomeCtrll', ['$scope','sharedData','poleData',
		function($scope, sharedData, poleData) {
			$scope.mapOptions = {
				center: new google.maps.LatLng(window.mySettings.defaultLati, window.mySettings.defaultLongi),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDoubleClickZoom: true,  
				zoomControlOptions: {  style: google.maps.ZoomControlStyle.SMALL }, 
				streetViewControl: false, 
				mapTypeControl: false
			};

			$scope.chosenPlace = '';
			$scope.chosenPoleNumber = '';
			$scope.isLoading = false;
			$scope.poles = {};

			// When click the search button, the map will be changed to the chosen address
			$scope.searchAddress = function() {
				var result = sharedData.getLocationOrViewport();
				if(result.type == 'viewport') {
					$scope.myMap.fitBounds(result.value);
					$scope.myMap.setZoom(18);
				} else if(result.type == 'location') {
					$scope.myMap.setCenter(result.value);
					$scope.myMap.setZoom(18);
				}
			};

			// When zoom > 17, display the poles
			$scope.zoomChanged = function(zoom) {
				console.log('Zoom now is: ' + zoom);
				if(zoom > 17) {
					$scope.isLoading = true;
					var bounds = $scope.myMap.getBounds();
		            var ne = bounds.getNorthEast();
		            var sw = bounds.getSouthWest();
		            var viewbox = { 
		            	"bottomleft": { "lat": sw.lat(), "lng": sw.lng() }, 
		            	"topright": { "lat": ne.lat(), "lng": ne.lng()} 
		            };

		            poleData.getPoles({box: viewbox}).then(function(result) {
		            	$scope.poles = result.d;
		            	$scope.isLoading = false;
		            }, function(error) {
		            	console.log(error);
		            	$scope.isLoading = false;
		            });
					
				}
			};

			$scope.$watch('poles', function(newVal, oldVal) {
				if(!$.isEmptyObject($scope.poles)) {
					setMarkers();
				}
			});

			function setMarkers(singleasset) {
				var assets = $scope.poles;
				var notfound = true;
			    var count = 0;
			    var text = 'Click <b>here</b> to report this light.';

			    $.each(assets, function (index, asset) {
			        if (asset.lat) {
			            var location = new google.maps.LatLng(asset.lat, asset.lng);
			            var image = 'images/green.png';
			            if (asset.Status == 'reported') {
			                image = 'images/red.png';
			            }
			            else if (asset.Status == 'held') {
			                image = 'images/blue.png';
			            }
			            else if (asset.Status == 'nonausgrid') {
			                image = 'images/pink.png';
			            }
			            var marker = new google.maps.Marker({
			                position: location,
			                map: $scope.myMap,
			                icon: image,
			                title: asset.AssetNo
			            });

			            //attachInfoWindow(marker);
			            //if the singleasset matches the current asset, create a new info window open it on the marker
			            //note that the asset may have a non-unique identifier due to the data, so only first match is returned
			            if (singleasset && notfound && count == 0) {
			                if (singleasset.AssetNo == asset.AssetNo) {
			                    count++;
			                    show = false;
			                    notfound = false;
			                    if (asset.Status == 'reported' || asset.Status == 'held') {
			                        text = 'This has already been reported to Ausgrid and we are working on it';
			                    }
			                    else if (asset.Status == 'nonausgrid') {
			                        text = 'Sorry, this light does not belong to Ausgrid. Please contact the council for this area';
			                    }
			                    var infowindow = new google.maps.InfoWindow(
			                {
			                    content: '<span class=formatText >' + asset.AssetNo + ', status:' + asset.Status + '</span><p>Light located! ' + text + '</p>',
			                    size: new google.maps.Size(50, 50)
			                });
			                    infowindow.open($scope.myMap, marker);
			                }
			            }
			        }
			    });
			};
		}
	]);
});