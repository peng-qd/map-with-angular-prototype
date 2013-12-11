define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('HomeCtrll', ['$scope','$compile','$location','sharedData','poleData',
		function($scope, $compile, $location, sharedData, poleData) {
			$scope.chosenPlace = '';
			$scope.chosenPoleNumber = '';
			$scope.isLoading = false;
			$scope.poles = {};

			$scope.marker = {};
    		$scope.markerAddress = '';

			var infoWindowArray = [];
			var markersArray = [];
			var geocoder = new google.maps.Geocoder();

			var content = '<div id="infowindow_content" ng-include src="\'/views/infowindow.html\'"></div>';
			var compiled = $compile(content)($scope);

			$scope.mapOptions = {
				center: new google.maps.LatLng(window.mySettings.defaultLati, window.mySettings.defaultLongi),
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				disableDoubleClickZoom: true,  
				zoomControlOptions: {  style: google.maps.ZoomControlStyle.SMALL }, 
				streetViewControl: false, 
				mapTypeControl: false
			};

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

		            // retrieve poles from Ausgrid service
		            poleData.getPoles({box: viewbox}).then(function(result) {
		            	$scope.poles = result.d;
		            	$scope.isLoading = false;
		            }, function(error) {
		            	console.log(error);
		            	$scope.isLoading = false;
		            });
				} else {
					$scope.poles = {};
					resetMarkers();
					resetInfoWindows();
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

		            	markersArray.push(marker);
			            attachInfoWindow(marker);
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

			//attach custom infowindow to marker
			function attachInfoWindow(marker) {
			    //create a new infowindow object
			    var infowindow = new google.maps.InfoWindow({ content: 'empty', size: new google.maps.Size(50, 50) });

			    //add to array so can manage open and close
			    infoWindowArray.push(infowindow);
			    //add click handler
			    google.maps.event.addListener(marker, 'click', function () {
			        clickMarker(marker, infowindow)
			    });
			};

			//on click geocode the address from the lat long of the marker and display it
			function clickMarker(marker, infowindow) {
			    if (marker.getIcon() == 'images/green.png') {
			        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
			            if (status == google.maps.GeocoderStatus.OK) {
			                if (results[0]) {
			                	// hacking: sometime ng-include is not working for second time
			                	if(!compiled[0].nextSibling) {
			                		compiled = $compile(content)($scope);
			                	}

		                		$scope.marker = marker;
		                		$scope.markerAddress = results[0].formatted_address;

		                		$scope.$apply();
              					infowindow.content = compiled[0].nextSibling;

			                    resetInfoWindows();
			                    infowindow.open($scope.myMap, marker);
			                }
			            }
			        });
			    }
			    else if (marker.getIcon() == 'images/red.png' || marker.getIcon() == 'images/blue.png') {
			        infowindow.content = '<span class=formatText ><p>' + marker.title + '</p></span><p>This light has already been reported to us,<br /> we are working on fixing it.</p>';
			        resetInfoWindows();
			        infowindow.open($scope.myMap, marker);
			    }
			    else {
			        infowindow.content = '<span class=formatText ><p>' + marker.title + '</p></span><p>This light does not belong to Ausgrid, please contact the council</p>';
			        resetInfoWindows();
			        infowindow.open($scope.myMap, marker);
			    }

			}

			//clear all current markers
			function resetMarkers() {
			    if (markersArray.length) {
			        for (var i = 0; i < markersArray.length; i++) {
			            markersArray[i].setMap(null);
			        }
			        markersArray.length = 0;
			    }
			}


			//clear all infowindows
			function resetInfoWindows() {
			    if (infoWindowArray.length) {
			        for (var i = 0; i < infoWindowArray.length; i++) {
			            infoWindowArray[i].close();
			        }
			    }
			}

			$scope.reportAsset = function () {
				sharedData.currentMarker = $scope.marker;
				sharedData.currentAddress = $scope.markerAddress;
				$location.path('/report');
			};
		}
	]);
});