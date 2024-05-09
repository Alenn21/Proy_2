//Diego Vega Bohórquez
// Importar el modelo de Usuario
var Usuario = require('../../models/usuario');

// Función para obtener la lista de usuarios
exports.usuarios_list = async function(req, res){
    try {
        console.log("Entrando a la función usuarios_list"); // Mensaje de depuración para verificar si la función se está llamando
        
        // Consultar todos los usuarios en la base de datos
        const usuarios = await Usuario.find({}).exec();
        console.log("Usuarios encontrados:", usuarios); // Mensaje de depuración para ver los usuarios encontrados
        
        // Enviar una respuesta con los usuarios encontrados
        res.status(200).json({ usuarios: usuarios });
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error); // Mostrar errores en la consola si ocurren
        // Enviar una respuesta de error al cliente con el mensaje de error
        res.status(500).json({ error: 'Error al obtener todos los usuarios: ' + error.message });
    }
};

// Función para crear un nuevo usuario
exports.usuarios_create = async function(req, res){
    try {
        // Crear un nuevo usuario con el nombre proporcionado en la solicitud
        var usuario = new Usuario({nombre: req.body.nombre});
        // Guardar el usuario en la base de datos
        await usuario.save();
        // Enviar una respuesta con el usuario creado
        res.status(200).json(usuario);
    } catch (err) {
        // Enviar una respuesta de error al cliente con el mensaje de error
        res.status(500).json({ error: err.message });
    }
};

// Función para reservar una bicicleta para un usuario
exports.usuario_reservar = async function(req, res){
    try {
        // Buscar al usuario por su ID
        const usuario = await Usuario.findById(req.body.id);
        console.log(usuario);
        // Realizar la reserva utilizando el método reservar del usuario
        await usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta);
        console.log('reserva :>');
        // Enviar una respuesta exitosa al cliente
        res.status(200).send();
    } catch (error) {
        console.error('Error al reservar:', error);
        // Enviar una respuesta de error al cliente con el mensaje de error
        res.status(500).json({ error: 'Error al reservar: ' + error.message });
    }
};