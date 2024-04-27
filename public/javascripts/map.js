//Diego Alejandro Vega Bohórquez

var map = L.map('main_map', {
    center: [4.6558194,-74.1408286],
    zoom: 16
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

    

$.ajax({//request asincronico http para hacer una solicitud a una web en formato JSON
    dataType: 'json',
    url: "/api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion).addTo(map).bindPopup('Bici ID='+bici.id)//ventana emergente
            .openPopup();
        });
    }
})