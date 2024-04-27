/* Diego Alejandro Vega Bohórquez */
// Importa el módulo 'express' para manejar las rutas HTTP
var express = require('express');
// Crea un objeto Router de Express para manejar las rutas
var router = express.Router();
// Importa el controlador de bicicletas desde el archivo 'bicicleta.js'
var bicicletaController = require ('../controllers/bicicleta.js');

// Define las rutas y los controladores asociados

// Ruta GET para obtener la lista de bicicletas
router.get('/', bicicletaController.bicicleta_list);
// Ruta GET para mostrar el formulario de creación de bicicletas
router.get('/create',bicicletaController.bicicleta_create_get);
// Ruta POST para manejar la creación de bicicletas
router.post('/create',bicicletaController.bicicleta_create_post);
// Ruta GET para mostrar los detalles de una bicicleta específica por medio de su id
router.get('/:id/read',bicicletaController.bicicleta_read_get);
// Ruta POST para manejar los detalles de una bicicleta específica por medio de su id
router.post('/:id/read',bicicletaController.bicicleta_read_post);
// Ruta GET para mostrar el formulario de actualización de una bicicleta específica por medio de su id
router.get('/:id/update',bicicletaController.bicicleta_update_get);
// Ruta POST para manejar la actualización de una bicicleta específica por medio de su id
router.post('/:id/update',bicicletaController.bicicleta_update_post);
// Ruta POST para manejar el borrado de una bicicleta específica por medio de su id
router.post('/:id/delete',bicicletaController.bicicleta_delete_post);//:id indica que es un parametro
// Exporta el router para que pueda ser utilizado por otros archivos
module.exports = router;