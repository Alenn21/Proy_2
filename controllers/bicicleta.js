//Diego Alejandro Vega Bohórquez

//Se importa el modulo 'Bicicleta' de la carpeta models
var Bicicleta = require('../models/bicicleta.js');

// Controlador para mostrar la lista de bicicletas en la página web
exports.bicicleta_list = function(req,res){
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis}); // Por medio del objeto Response se envia la lista allBicis cuando se acceda a la URL bicicletas/index
}
// Controlador para mostrar el formulario de creación de bicicletas por medio del metodo de petición HTTP GET
exports.bicicleta_create_get = function(req,res){
    //Renderiza la URL bicicletas/create
    res.render('bicicletas/create');  //Por medio del Objeto Response se redirige al Usuario al apartado bicicletas/create
}
// Controlador para procesar la creación de una bicicleta por medio del metodo de petición HTTP POST
exports.bicicleta_create_post = function(req,res){
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo); //Se realiza la creación de un Objeto Bicicleta bici y se le asignan los atributos por medio de los datos obtenidos del Objeto Request
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici); //Se añade al vector de datos allBicis el objeto bici

    res.redirect('/bicicletas'); //Por medio del objeto Response se redirige al Usuario a la URL /bicicletas
}
// Controlador para mostrar los detalles de una bicicleta (Consultar) por medio del metodo de petición HTTP GET
exports.bicicleta_read_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id); //Se crea un objeto Bicicleta 'bici' al cual se le asignan los valores de la bicicleta consultada por medio del id obtenido del objeto Request
    // Renderiza la plantilla 'bicicletas/read' y pasa el objeto 'bici' como contexto de datos
    res.render('bicicletas/read', {bici}); //Se redirige al Usuario por medio del Objeto Response a la URL bicicletas/read y se manda el objeto bici como JSON
} 
// Controlador para mostrar los detalles de una bicicleta (Consultar) por medio del metodo de petición HTTP POST
exports.bicicleta_read_post = function(req,res){
    var bici = Bicicleta.findById(req.params.id); //Se crea un objeto Bicicleta 'bici' al cual se le asignan los valores de la bicicleta consultada por medio del id obtenido del objeto Request
    bici.id= req.body.id; //Se recibe y se asigna al objeto el nuevo ID recibido por medio del objeto Request
    bici.color= req.body.color; //Se recibe y se asigna al objeto el nuevo color recibido por medio del objeto Request
    bici.modelo= req.body.modelo; //Se recibe y se asigna al objeto el nuevo modelo recibido por medio del objeto Request
    bici.ubicacion =[req.body.lat, req.body.lng]; //Se recibe y se asigna al objeto la nueva ubicación recibido por medio del objeto Request
    res.redirect('/bicicletas'); //Por medio del objeto Response se redirige al Usuario a la URL /bicicletas
}
// Controlador para mostrar el formulario de actualización de una bicicleta  por medio del metodo de petición HTTP GET
exports.bicicleta_update_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id); //Se crea un objeto Bicicleta 'bici' al cual se le asignan los valores de la bicicleta consultada por medio del id obtenido del objeto Request
    // Renderiza la plantilla 'bicicletas/read' y pasa el objeto 'bici' como contexto de datos
    res.render('bicicletas/update', {bici}); //Se redirige al Usuario por medio del Obejto Response a la URL bicicletas/update y se manda el objeto bici como JSON
}
// Controlador para mostrar el formulario de actualización de una bicicleta  por medio del metodo de petición HTTP POST
exports.bicicleta_update_post = function(req,res){
    var bici = Bicicleta.findById(req.params.id); //Se crea un objeto Bicicleta 'bici' al cual se le asignan los valores de la bicicleta consultada por medio del id obtenido del objeto Request
    bici.id= req.body.id; //Se recibe y se asigna al objeto el nuevo ID recibido por medio del objeto Request
    bici.color= req.body.color; //Se recibe y se asigna al objeto el nuevo color recibido por medio del objeto Request
    bici.modelo= req.body.modelo; //Se recibe y se asigna al objeto el nuevo modelo recibido por medio del objeto Request
    bici.ubicacion =[req.body.lat, req.body.lng]; //Se recibe y se asigna al objeto la nueva ubicación recibido por medio del objeto Request
    res.redirect('/bicicletas');  //Por medio del objeto Response se redirige al Usuario a la URL /bicicletas
}

// Controlador para eliminar una bicicleta por medio del metodo de petición HTTP POST
exports.bicicleta_delete_post = function (req, res){
    Bicicleta.removeById(req.body.id); //Se realiza la eliminación de una bicicleta del vector allBicis or medio del método removeById al cual se le manda el ID de la bicicleta obtenido por el objeto Request

    res.redirect('/bicicletas');//Por medio del objeto Response se redirige al Usuario a la URL /bicicletas
}