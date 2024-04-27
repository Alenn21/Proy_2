/* Diego Alejandro Vega Bohórquez */
// Importa el módulo 'express' para manejar las rutas HTTP
var express = require('express');
// Crea un objeto Router de Express para manejar las rutas
var router = express.Router();

/* GET users listing. */
// Define una ruta GET para la página de inicio ('/') (Nodo Raíz)
router.get('/', function(req, res, next) {
  // Envía una respuesta con el texto 'respond with a resource'
  res.send('respond with a resource');
});
// Exporta el router para que pueda ser utilizado por otros archivos
module.exports = router;
