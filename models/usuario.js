//Diego Vega Bohórquez
// Requerir la librería mongoose para la interacción con la base de datos MongoDB
var mongoose = require ('mongoose');

// Requerir el modelo de Reserva para asociar reservas con usuarios
var Reserva = require('./reserva');

// Crear un nuevo esquema para el modelo de Usuario
var Schema = mongoose.Schema;

// Definir el esquema de Usuario con un campo "nombre" de tipo String
var usuarioSchema = new Schema ({
    nombre: String
});

// Definir un método personalizado llamado "reservar" en el esquema de Usuario
usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    // Crear una nueva instancia de Reserva con los datos proporcionados
    var reserva = new Reserva({
        usuario: this._id, // ID del usuario actual
        bicicleta: biciId, // ID de la bicicleta a reservar
        desde: desde, // Fecha de inicio de la reserva
        hasta: hasta // Fecha de fin de la reserva
    });
    console.log(reserva); // Imprimir la reserva en la consola para depuración
    // Guardar la reserva en la base de datos utilizando el método "save" de Mongoose
    reserva.save(cb); // Se pasa una función de devolución de llamada "cb" opcional para manejar el resultado de la operación
}

// Exportar el modelo de Usuario, asignándolo al nombre "Usuario" y utilizando el esquema definido anteriormente
module.exports = mongoose.model('Usuario', usuarioSchema);
