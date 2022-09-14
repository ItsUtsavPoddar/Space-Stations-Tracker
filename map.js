
var map = L.map("map").setView([43.978122, 15.38365], 15.2);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
           maxZoom: 19,
           attribution: '© OpenStreetMap'
       }).addTo(map);

