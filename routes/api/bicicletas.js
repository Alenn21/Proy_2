/* Diego Alejandro Vega Bohórquez */
// Importa el módulo 'express' para manejar las rutas HTTP
var express = require('express');
// Crea un objeto Router de Express para manejar las rutas
var router = express.Router();
// Importa el controlador de bicicletas API
var bicicletaController = require ('../../controllers/api/bicicletaControllerAPI.js');

// Define las rutas y los controladores asociados

// Ruta GET para obtener la lista de bicicletas
router.get('/', bicicletaController.bicicleta_list);
// Ruta POST para crear una nueva bicicleta
router.post('/create', bicicletaController.bicicleta_create);
// Ruta DELETE para eliminar una bicicleta existente
router.delete('/delete', bicicletaController.bicicleta_delete);
// Ruta PUT para actualizar una bicicleta existente
router.put('/update', bicicletaController.bicicleta_put);
// Exporta el router para que pueda ser utilizado por otros archivos
module.exports = router;
