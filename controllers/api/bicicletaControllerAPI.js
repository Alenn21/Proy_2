// Diego Alejandro Vega Bohórquez
//Se importa el modulo 'Bicicleta' de la carpeta models
var Bicicleta = require('../../models/bicicleta');

// Controlador para obtener la lista de bicicletas por medio de la API
exports.bicicleta_list = function(req, res) { //Devuelve un estado 200 y manda la lista de Bicicletas en formato JSON
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    });
}

// Controlador para crear una bicicleta nueva por medio de la API
exports.bicicleta_create = function(req, res) {
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo); //Se realiza la creación de un Objeto Bicicleta "bici" y se le añaden sus atributos por medio del objeto Request
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici); //Se añade la Bicicleta a la lista allBicis
    res.status(200).json({ 
        bicicleta: bici
    }); //Se devuelve un stado 200 y se manda en formato JSON al objeto bici
}

// Controlador para actualizar una bicicleta existente por medio de la API
exports.bicicleta_put = function(req, res) {
    var bici = Bicicleta.findById(req.body.id); //Se realiza la creación de un Objeto Bicicleta asignandole el Valor del Objeto Bicicleta que fue consultado por medio de su ID
    bici.id = req.body.id; //Se recibe y se asigna al objeto el nuevo ID recibido por medio del objeto Request
    bici.color = req.body.color; //Se recibe y se asigna al objeto el nuevo color recibido por medio del objeto Request
    bici.modelo = req.body.modelo; //Se recibe y se asigna al objeto el nuevo modelo recibido por medio del objeto Request
    bici.ubicacion = [req.body.lat, req.body.lng]; //Se recibe y se asigna al objeto la nueva ubicación recibido por medio del objeto Request
    res.status(200).json({ 
        bicicleta: bici
    }); //Se retorna un estado 200 y se manda el objeto bici como JSON
}

// Controlador para eliminar una bicicleta por medio de la API
exports.bicicleta_delete = function(req, res) {
    Bicicleta.removeById(req.body.id); //Se hace uso del método removeById para realizar la eliminación de la Bicicleta del vector de datos, cuyo ID es recibido por el objeto Request
    res.status(204).send(); // Se devuelve estado 204 Not Found
}