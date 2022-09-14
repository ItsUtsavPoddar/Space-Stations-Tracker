var map = L.map('map');

L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var terminator = L.terminator().addTo(map);

map.setView([0,0],1);


   var iconiss = L.icon({
    iconUrl:"https://iconarchive.com/download/i106861/goodstuff-no-nonsense/free-space/international-space-station.ico",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
})

var icontss = L.icon({
    iconUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Chinese_large_orbital_station.png/220px-Chinese_large_orbital_station.png",
    iconSize: [50, 30],
    iconAnchor: [25, 15],
})


var satmarkeriss = L.marker([0, 0],{icon: iconiss}).addTo(map)

var satcircleiss = L.circle([0, 0], {
    weight:1,
    opacity:0.4,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius:  2200e3
}).addTo(map);

var satmarkertss = L.marker([0, 0],{icon: icontss}).addTo(map)

var satcircletss = L.circle([0, 0], {
    weight:1,
    opacity:0.4,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius:  2200e3
}).addTo(map);


function locateiss(lat,long) {

    satmarkeriss.setLatLng([lat,long]);
    satcircleiss.setLatLng([lat,long]);

    };

function locatetss(lat,long) {

        satmarkertss.setLatLng([lat,long]);
        satcircletss.setLatLng([lat,long]);
    
        };


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

setInterval(function() {
	terminator.setTime();
}, 1000);    
    