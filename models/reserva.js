// Requerir la librería mongoose para la interacción con la base de datos MongoDB
var mongoose = require ('mongoose');

// Requerir la librería moment para el manejo de fechas
var moment = require('moment');

// Crear un nuevo esquema para el modelo de Reserva
var Schema = mongoose.Schema;

// Definir el esquema de Reserva con los campos "desde" y "hasta" de tipo Date
// El campo "bicicleta" es una referencia al modelo Bicicleta
// El campo "usuario" es una referencia al modelo Usuario
var reservaSchema = new Schema({
    desde: Date,
    hasta: Date,
    bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta' },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

// Definir un método personalizado llamado "diasDeReserva" en el esquema de Reserva
// Este método calcula la duración de la reserva en días utilizando la librería moment
reservaSchema.methods.diasDeReserva = function(){
    // Calcular la diferencia en días entre la fecha de inicio y la fecha de fin de la reserva
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1;
}

// Exportar el modelo de Reserva, asignándolo al nombre "Reserva" y utilizando el esquema definido anteriormente
module.exports = mongoose.model('Reserva', reservaSchema);
