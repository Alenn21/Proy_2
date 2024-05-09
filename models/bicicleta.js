//Diego Alejandro Vega Bohórquez
// Requerir la librería mongoose para la interacción con la base de datos MongoDB
var mongoose = require('mongoose');

// Crear un nuevo esquema para el modelo de Bicicleta
var Schema = mongoose.Schema;

// Definir el esquema de Bicicleta con los campos "code", "color", "modelo" y "ubicacion"
var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});

// Método estático para crear una nueva instancia de Bicicleta con los datos proporcionados
bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo, 
        ubicacion: ubicacion
    });
}

// Método para convertir la información de una bicicleta en una cadena de texto
bicicletaSchema.methods.toString = function(){
    return 'code: ' + this.code + ' | color: ' + this.color;
}

// Método estático para obtener todas las bicicletas almacenadas en la base de datos
bicicletaSchema.statics.allBicis = async function() {
    try {
        console.log("Entrando a la función allBicis"); // Mensaje de depuración para verificar si la función se está llamando
        
        // Consultar todas las bicicletas en la base de datos
        const bicicletas = await this.find({}).exec();
        console.log("Bicicletas encontradas:", bicicletas); // Mensaje de depuración para ver las bicicletas encontradas
        
        return bicicletas;
    } catch (error) {
        console.error('Error al obtener todas las bicicletas:', error); // Mostrar errores en la consola si ocurren
        throw new Error('Error al obtener todas las bicicletas: ' + error.message);
    }
};

// Método estático para agregar una nueva bicicleta a la base de datos
bicicletaSchema.statics.add = function (aBici) {
    console.log("entre a la funcion de crear");
    return this.create(aBici); // Utilizar el método create() de Mongoose para crear una nueva bicicleta
}

// Método estático para encontrar una bicicleta por su código
bicicletaSchema.statics.findByCode = function(aCode) {
    console.log("entre a la funcion de consulta");
    return this.findOne({ code: aCode }).exec(); // Utilizar findOne() para encontrar una bicicleta por su código
}

// Método estático para eliminar una bicicleta por su código
bicicletaSchema.statics.removeByCode = function(aCode) {
    console.log("Entre a la eliminación de una Bici");
    return this.deleteOne({ code: aCode }).exec(); // Utilizar deleteOne() para eliminar una bicicleta por su código
}

// Crear el modelo de Bicicleta utilizando el esquema definido anteriormente
var Bicicleta = mongoose.model('Bicicleta', bicicletaSchema);


/*
// Crear una instancia de bicicleta utilizando el método createInstance
var nuevaBicicleta = Bicicleta.createInstance(1, "Rojo", "BMX", [4.6558194, -74.1408286]);
console.log("hola"+nuevaBicicleta.toString());
Bicicleta.add(nuevaBicicleta);
Bicicleta.allBicis(function(err, bicicletas) {
    console.log(bicicletas);
});
//Encontrar Bici
    Bicicleta.findByCode(1)
    .then(function(bici) {
        console.log("Bicicleta encontrada:", bici);
    })
    .catch(function(error) {
        console.error("Error al buscar la bicicleta por código:", error);
    });
    //Eliminar Bici
    Bicicleta.removeByCode(1)
    .then(function() {
        console.log("Bicicleta eliminada exitosamente");
    })
    .catch(function(error) {
        console.error("Error al eliminar bicicleta:", error);
    });
*/
module.exports = Bicicleta;