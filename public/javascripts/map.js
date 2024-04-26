var map = L.map('main_map', {
    center: [4.6558194,-74.1408286],
    zoom: 19
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var polygon = L.polygon([
    [4.579604, -74.158081],
    [4.578556, -74.158457],
    [4.579117, -74.157245]
]).addTo(map);
polygon.bindPopup("Universidad Distrital");

L.marker([4.6558194,-74.1408286]).addTo(map)//marcador, latitud y longitud
    .bindPopup('Bicicleta 1 :>')//ventana emergente
    .openPopup();
    L.marker([4.579604, -74.158081]).addTo(map)//marcador, latitud y longitud
    .bindPopup('Bicicleta 2 :>')//ventana emergente
    .openPopup();


var circle = L.circle([4.6558194,-74.1408286], {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.5,
    radius: 50
}).addTo(map);