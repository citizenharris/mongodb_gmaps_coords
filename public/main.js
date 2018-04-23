
// global "map" variable
var map = null;
var marker = null;

var infowindow = new google.maps.InfoWindow(
      { 
        size: new google.maps.Size(150,50)
      });

    // A function to create the marker and set up the event window function 
    function createMarker(latlng, name, html) {
        var contentString = html;
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            zIndex: Math.round(latlng.lat()*-100000)<<5
            });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(contentString); 
            infowindow.open(map,marker);
            });
        google.maps.event.trigger(marker, 'click');    
        return marker;
    }   

    function initialize() {
      // create the map
      var myOptions = {
        zoom: 15,
        center: new google.maps.LatLng(52.2053, 0.1218),
        mapTypeControl: true,
        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        navigationControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map_canvas"),
                                    myOptions);
     
      google.maps.event.addListener(map, 'click', function() {
            infowindow.close();
            });

      google.maps.event.addListener(map, 'click', function(event) {
      //call function to create marker
             if (marker) {
                marker.setMap(null);
                marker = null;
             }
       marker = createMarker(event.latLng, "name", "<b>Location</b><br>"+event.latLng + "<form action='/coords' method='POST'><button type='submit'>Save coordinate</button></form>");
      });
    }