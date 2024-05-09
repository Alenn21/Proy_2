// Diego Alejandro Vega Bohórquez
//Se importa el modulo 'Bicicleta' de la carpeta models
var Bicicleta = require('../../models/bicicleta');

// Controlador para obtener la lista de bicicletas por medio de la API
exports.bicicleta_list = async function(req, res) {
    try {
        const bicicletas = await Bicicleta.allBicis(); // Llama a la función estática allBicis del modelo Bicicleta
        res.status(200).json({ bicicletas }); // Devuelve la lista de bicicletas en formato JSON
    } catch (error) {
        console.error('Error al obtener la lista de bicicletas:', error);
        res.status(500).json({ error: 'Error al obtener la lista de bicicletas' });
    }
}

// Controlador para crear una bicicleta nueva por medio de la API
exports.bicicleta_create = async function(req, res) {
    try {
        var bici = Bicicleta.createInstance(req.body.id, req.body.color, req.body.modelo, [req.body.lat, req.body.lng]); // Crea una nueva instancia de Bicicleta
        await Bicicleta.add(bici); // Llama a la función estática add del modelo Bicicleta para añadir la bicicleta
        res.status(200).json({ bicicleta: bici }); // Devuelve la bicicleta creada en formato JSON
    } catch (error) {
        console.error('Error al crear la bicicleta:', error);
        res.status(500).json({ error: 'Error al crear la bicicleta' });
    }
}

// Controlador para actualizar una bicicleta existente por medio de la API
exports.bicicleta_put = async function(req, res) {
    try {
        var bici = await Bicicleta.findByCode(req.body.id); // Busca la bicicleta por su código
        bici.code = req.body.id; // Actualiza los datos de la bicicleta
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];
        await bici.save(); // Guarda los cambios en la base de datos
        res.status(200).json({ bicicleta: bici }); // Devuelve la bicicleta actualizada en formato JSON
    } catch (error) {
        console.error('Error al actualizar la bicicleta:', error);
        res.status(500).json({ error: 'Error al actualizar la bicicleta' });
    }
}

// Controlador para eliminar una bicicleta por medio de la API
exports.bicicleta_delete = async function(req, res) {
    try {
        await Bicicleta.removeByCode(req.body.id); // Llama a la función estática removeByCode del modelo Bicicleta para eliminar la bicicleta por su código
        res.status(204).send(); // Devuelve el código de estado 204 (No Content) indicando que se eliminó la bicicleta
    } catch (error) {
        console.error('Error al eliminar la bicicleta:', error);
        res.status(500).json({ error: 'Error al eliminar la bicicleta' });
    }
}
