/* Diego Alejandro Vega Bohórquez */
// Importa el módulo 'express' para manejar las rutas HTTP
var express = require('express');
// Crea un objeto Router de Express para manejar las rutas
var router = express.Router();

/* GET home page. */
// Define una ruta GET para la página de inicio ('/') (Nodo Raíz)
router.get('/', function(req, res, next) {
  // Renderiza la plantilla 'index' y pasa el título 'Express' como variable
  res.render('index', { title: 'Express' });
});
// Exporta el router para que pueda ser utilizado por otros archivos
module.exports = router;
