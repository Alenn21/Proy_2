// Requerir el módulo express para crear el enrutador
var express = require('express');

// Crear un nuevo enrutador utilizando express.Router()
var router = express.Router();

// Requerir el controlador de usuario para manejar las solicitudes relacionadas con usuarios
var usuarioController = require('../../controllers/api/usuarioControllerAPI');

// Definir las rutas y asociarlas con las funciones del controlador de usuario correspondientes

// Ruta para obtener la lista de usuarios (GET: /api/usuarios)
router.get('/', usuarioController.usuarios_list);

// Ruta para crear un nuevo usuario (POST: /api/usuarios/create)
router.post('/create', usuarioController.usuarios_create);

// Ruta para reservar una bicicleta para un usuario existente (POST: /api/usuarios/reservar)
router.post('/reservar', usuarioController.usuario_reservar);

// Exportar el enrutador para que esté disponible en el archivo app.js
module.exports = router;
