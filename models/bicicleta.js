//Diego Alejandro Vega Bohórquez

//Constructor para la creación de una Bicicleta
var Bicicleta = function (id,color, modelo, ubicacion){
    this.id=id; //Se asigna el valor id al atributo id
    this.color = color;// se le asigna el valor de color al atributo color
    this.modelo = modelo;//se le asigna el valor de modelo al atributo modelo
    this.ubicacion = ubicacion;//se le asigna el valor de ubicacion al atributo ubicacion
}
//Método .toString para mostrar la información de una bicicleta
Bicicleta.prototype.toString = function (){
    return "id: "+this.id+" | color: "+this.color+" | modelo: "+this.modelo+" | ubicación: "+this.ubicacion;
}

//Vector de Datos que guarda objetos Bicicleta
Bicicleta.allBicis = [];
//Función para añadir un objeto Bicicleta al vector de datos allBicis
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);//Se agrega aBici a allBicis
}
//Función para la consulta de una bicicleta por su ID
Bicicleta.findById = function (aBiciId){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId); //Se busca la bici con el id aBiciId en el vector allBicis y se le asigna el valor al objeto aBici
    if(aBici){
        return aBici; //Si se encuentra devuelve la bicicleta aBici
    }else{
        throw new Error(`No existe una Bicicleta con el ID: ${aBiciId}`); //Si no encuentra la bicicleta en el vector allBicis lanza un Error
    }
}
//Función para Eliminar una bicicleta del Vector de Datos allBicis por medio de su ID
Bicicleta.removeById = function (aBiciId){
    for(var i = 0; i < Bicicleta.allBicis.length; i++){//Se crea un bucle para encontarr una bicicleta que este en la lista allBicis que tenga el id aBiciId
        if(Bicicleta.allBicis[i].id == aBiciId){ 
            Bicicleta.allBicis.splice(i, 1);//Si la encuentra la elimina del vector allBicis y rompe el bucle
            break;
        }
    }
}
//Creación y adición de 2 Bicicletas al vector allBicis
var bicia = new Bicicleta (1, "Rojo con Negro", "BMX", [4.6558194,-74.1408286]);
var bicib = new Bicicleta (2, "Azul con Blanco", "BMX", [4.6658195,-74.1508287]);
//Se hace uso del método .add apra añadir las dos Bicicletas anteriormente creadas al vector de datos allBicis
Bicicleta.add(bicia);
Bicicleta.add(bicib);
//Se realiza la exportación del Objeto Bicicleta
module.exports = Bicicleta;