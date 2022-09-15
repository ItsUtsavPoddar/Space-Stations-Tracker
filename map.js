// initializing the map on the "map" div with a given center and zoom

var map = L.map('map', {
    center: [0,0],
    zoom: 1
});

//Instantiates a tile layer object given a URL template (Here its google Hybrid Map image) with its default attributes

L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);


// from Leaflet.Terminator Library (https://github.com/joergdietrich/Leaflet.Terminator)

var terminator = L.terminator().addTo(map);

// Interval function to call setTime() method without an argument to refresh the terminator to the current time. (EVERY SECOND SPECIFIED BY 1000 ms)
setInterval(function() {
    terminator.setTime();
}, 1000);    
    


//Represents an icon to provide when creating a marker

//icon for ISS
var iconiss = L.icon({
    iconUrl:"https://iconarchive.com/download/i106861/goodstuff-no-nonsense/free-space/international-space-station.ico",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
})

//icon for TSS
var icontss = L.icon({
    iconUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Chinese_large_orbital_station.png/220px-Chinese_large_orbital_station.png",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
})



//FOR ISS
    //Instantiates a circle object given a geographical point, and an options object which contains the circle radius, etc
    var satcircleiss = L.circle([0, 0], {
        weight:1,
        opacity:0.4,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius:  2200e3
        }).addTo(map);

        // Instantiates a Marker object given a geographical point and optionally an options object. 
        // Here it contains icon option

        var satmarkeriss = L.marker([0, 0],{icon: iconiss}).addTo(map)

//FOR TSS
    //Instantiates a circle object given a geographical point, and an options object which contains the circle radius, etc
    var satcircletss = L.circle([0, 0], {
        weight:1,
        opacity:0.4,
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius:  2200e3
        }).addTo(map);

        // Instantiates a Marker object given a geographical point and optionally an options object. 
        // Here it contains icon option

        var satmarkertss = L.marker([0, 0],{icon: icontss}).addTo(map)


// gets the cords from Script.js for marker and circle for ISS
function locateiss(lat,long) {

    satmarkeriss.setLatLng([lat,long]);
    satcircleiss.setLatLng([lat,long]);

    };

// gets the cords from Script.js for marker and circle for TSS 
function locatetss(lat,long) {

        satmarkertss.setLatLng([lat,long]);
        satcircletss.setLatLng([lat,long]);
    
        };


// clicking on the map and you will see the coordinates in a popup (FROM DOCUMENTATION OF LEAFLET)      
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

