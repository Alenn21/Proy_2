//Diego Alejandro Vega Bohórquez

//Se importa el modulo 'Bicicleta' de la carpeta models
var Bicicleta = require('../models/bicicleta.js');

// Controlador para mostrar la lista de bicicletas en la página web
exports.bicicleta_list = function(req, res){
    Bicicleta.allBicis() // Aquí estamos llamando al método allBicis del modelo Bicicleta
        .then(function(bicis) {
            res.render('bicicletas/index', { bicis: bicis }); // Pasamos la lista de bicicletas al contexto de datos
        })
        .catch(function(error) {
            console.error('Error al obtener todas las bicicletas:', error);
            // Manejar el error de alguna manera apropiada, como enviar una respuesta de error al cliente
            res.status(500).send("Error al obtener todas las bicicletas: " + error.message);
        });
}
// Controlador para mostrar el formulario de creación de bicicletas por medio del metodo de petición HTTP GET
exports.bicicleta_create_get = function(req,res){
    //Renderiza la URL bicicletas/create
    res.render('bicicletas/create');  //Por medio del Objeto Response se redirige al Usuario al apartado bicicletas/create
}
// Controlador para procesar la creación de una bicicleta por medio del metodo de petición HTTP POST
exports.bicicleta_create_post = function(req, res){
    console.log("Recibiendo datos para crear una bicicleta:", req.body);
    var bici = Bicicleta.createInstance(req.body.id, req.body.color, req.body.modelo, [req.body.lat, req.body.lng]);
    console.log("Bicicleta creada:", bici);
    try {
        Bicicleta.add(bici);
        console.log("Bicicleta agregada correctamente.");
    } catch (error) {
        console.error("Error al agregar bicicleta:", error);
        // Manejar el error de alguna manera apropiada, como enviar una respuesta de error al cliente
        res.status(500).send("Error al agregar bicicleta: " + error.message);
        return; // Salir de la función para evitar la redirección
    }
    res.redirect('/bicicletas');
}

// Controlador para mostrar los detalles de una bicicleta (Consultar) por medio del metodo de petición HTTP GET
exports.bicicleta_read_get = function(req, res) {
    // Aquí resolvemos la promesa devuelta por findByCode()
    Bicicleta.findByCode(req.params.id)
        .then(function(bici) {
            // Renderizamos la plantilla 'bicicletas/read' y pasamos el objeto 'bici' como contexto de datos
            res.render('bicicletas/read', { bici: bici });
        })
        .catch(function(error) {
            // Si ocurre un error al buscar la bicicleta, manejarlo aquí
            console.error("Error al buscar bicicleta:", error);
            res.status(500).send("Error al buscar bicicleta: " + error.message);
        });
}
// Controlador para mostrar los detalles de una bicicleta (Consultar) por medio del metodo de petición HTTP POST
exports.bicicleta_read_post = function(req,res){
    var bici = Bicicleta.findByCode(req.params.id); //Se crea un objeto Bicicleta 'bici' al cual se le asignan los valores de la bicicleta consultada por medio del id obtenido del objeto Request
    bici.code= req.body.id; //Se recibe y se asigna al objeto el nuevo ID recibido por medio del objeto Request
    bici.color= req.body.color; //Se recibe y se asigna al objeto el nuevo color recibido por medio del objeto Request
    bici.modelo= req.body.modelo; //Se recibe y se asigna al objeto el nuevo modelo recibido por medio del objeto Request
    bici.ubicacion =[req.body.lat, req.body.lng]; //Se recibe y se asigna al objeto la nueva ubicación recibido por medio del objeto Request
    res.redirect('/bicicletas'); //Por medio del objeto Response se redirige al Usuario a la URL /bicicletas
}
// Controlador para mostrar el formulario de actualización de una bicicleta  por medio del metodo de petición HTTP GET
exports.bicicleta_update_get = function(req, res) {
    console.log("Entre a Update1");
    console.log("holii" + req.params.id);
    // Aquí resolvemos la promesa devuelta por findByCode()
    Bicicleta.findByCode(req.params.id)
        .then(function(bici) {
            // Ahora que tenemos el objeto bicicleta, renderizamos el formulario de actualización
            console.log(bici.toString());
            res.render('bicicletas/update', { bici: bici });
        })
        .catch(function(error) {
            // Si ocurre un error al buscar la bicicleta, manejarlo aquí
            console.error("Error al buscar bicicleta:", error);
            res.status(500).send("Error al buscar bicicleta: " + error.message);
        });
}
// Controlador para mostrar el formulario de actualización de una bicicleta  por medio del metodo de petición HTTP POST
exports.bicicleta_update_post = function(req, res) {
    // Buscamos la bicicleta por su código y actualizamos sus atributos con los valores recibidos del formulario
    Bicicleta.findByCode(req.params.id)
        .then(function(bici) {
            bici.code = req.body.id;
            bici.color = req.body.color;
            bici.modelo = req.body.modelo;
            bici.ubicacion = [req.body.lat, req.body.lng];

            // Guardamos los cambios en la base de datos
            return bici.save();
        })
        .then(function(updatedBici) {
            // Si se ha actualizado correctamente, redirigimos al usuario a la lista de bicicletas
            console.log("Bicicleta actualizada exitosamente:", updatedBici);
            res.redirect('/bicicletas');
        })
        .catch(function(error) {
            // Si ocurre un error, lo manejamos aquí
            console.error("Error al actualizar bicicleta:", error);
            res.status(500).send("Error al actualizar bicicleta: " + error.message);
        });
}

// Controlador para eliminar una bicicleta por medio del metodo de petición HTTP POST
exports.bicicleta_delete_post = function (req, res){
    Bicicleta.removeByCode(req.body.id).then(function() {
        console.log("Bicicleta eliminada exitosamente");
    })
    .catch(function(error) {
        console.error("Error al eliminar bicicleta:", error);
    }); //Se realiza la eliminación de una bicicleta del vector allBicis or medio del método removeById al cual se le manda el ID de la bicicleta obtenido por el objeto Request

    res.redirect('/bicicletas');//Por medio del objeto Response se redirige al Usuario a la URL /bicicletas
}