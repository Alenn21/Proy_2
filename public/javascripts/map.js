//Diego Alejandro Vega Bohórquez
// Se crea un objeto de mapa Leaflet con el ID 'main_map', centrado en las coordenadas [4.6558194, -74.1408286] y con un nivel de zoom de 16.
var map = L.map('main_map', {
    center: [4.6558194,-74.1408286],
    zoom: 16
});
// Se agrega una capa de teselas (tiles) desde OpenStreetMap al mapa, con una URL para la imagen de teselas y atribución.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
// Se crea un polígono con una serie de coordenadas de la sede Tecnológica de la UD y se agrega al mapa.
var polygon = L.polygon([
    [4.579604, -74.158081],
    [4.578556, -74.158457],
    [4.579117, -74.157245]
]).addTo(map);
// Se asigna un mensaje emergente (popup) al polígono.
polygon.bindPopup("Universidad Distrital");

    
// Se realiza una solicitud AJAX para obtener datos en formato JSON de la API de bicicletas.
$.ajax({//request asincronico http para hacer una solicitud a una web en formato JSON
    dataType: 'json',
    url: "/api/bicicletas",
    success: function(result){ //función que evalua el exito que tuvo la solicitud AJAX, en donde result es un parametro que contiene los datos devueltos por la API en formato JSON
        console.log(result);
        result.bicicletas.forEach(function(bici){ //Para cada bicicleta mandada de la API de bicicletas crea un marcador en el mapa
            L.marker(bici.ubicacion).addTo(map).bindPopup('Bici ID='+bici.id)//ventana emergente
            .openPopup();
        });
    }
})