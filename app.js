let DNIPRO; 
let map;

function initMap() {
    DNIPRO = new google.maps.LatLng(48.44919859, 35.0255331);
    map = new google.maps.Map(document.getElementById("map"), {
      center: DNIPRO,
      zoom: 11,
      mapTypeControl: true,
      mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER,
    },
    zoomControl: true,
    zoomControlOptions: {
    position: google.maps.ControlPosition.LEFT_CENTER,
      },
    });
    map.addListener('click', e => {
    console.log(e, e.latLng.lat(), e.latLng.lng())
    map.panTo({ lat: e.latLng.lat(), lng: e.latLng.lng()});
 });
    /*const geocoder = new google.maps.Geocoder();
    document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
    });*/
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    });
    document.getElementById("route").addEventListener("click", () => {
    makeRoute(directionsService, directionsRenderer);
    });
}
function markerAnimation(map, marker, latLng) {
    marker.setPosition(latLng);
    map.panTo(latLng);
}
function animateRoute(map, routeCoords) {
    let routeLine, marker, icon;
    routeLine = new google.maps.Polyline({
        path: [],
        strokeColor: '#000080',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: map
    });
    icon = {
        url: "Red_bird.png", 
        scaledSize: new google.maps.Size(40, 40), 
    };
    marker = new google.maps.Marker({ 
         map: map, 
         icon: icon, 
         animation: google.maps.Animation.DROP
    });

    marker.addListener('click', e => {
        map.setCenter(marker.getPosition());
            infoWindow.open(map, marker);
        });
        
    infoWindow = new google.maps.InfoWindow({
        content: `<h1>Heeey!</h1>`,
    });
    for (let i = 0; i < routeCoords.length; i++) {                
        setTimeout(function(coords) {
            routeLine.getPath().push(coords);
            markerAnimation(map, marker, coords);
        }, 600 * i, routeCoords[i]);
    }
}
function makeRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
          origin: document.getElementById("from").value,
          destination: document.getElementById("to").value,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
                if (status === 'OK' && result) {
                    directionsRenderer.setDirections(result);
                    animateRoute(map, result.routes[0].overview_path);
        }
        });
}
/*function getGeoLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                console.log(pos);
            },
            () => {
                console.error('Error: The Geolocation service failed.');
            }
        );
    } else {
        console.error('Error: Your browser doesn\'t support geolocation.');
    }      
}

function geocodeAddress(geocoder, map) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
            console.log(results[0]);
            map.panTo(results[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
            });
        } else {
            console.warn(`Geocode was not successful for the following reason: ${status}`);
        }
    }); 
}*/