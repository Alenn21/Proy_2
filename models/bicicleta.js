//Diego Alejandro Vega Bohórquez

var Bicicleta = function (id,color, modelo, ubicacion){
    this.id=id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

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
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if(aBici){
        return aBici;
    }else{
        throw new Error(`No existe una Bicicleta con el ID: ${aBiciId}`);
    }
}
//Función para Eliminar una bicicleta del Vector de Datos allBicis por medio de su ID
Bicicleta.removeById = function (aBiciId){
    for(var i = 0; i < Bicicleta.allBicis.length; i++){
        if(Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}
//Se crean y se añaden 2 Bicicletas al vector allBicis
var bicia = new Bicicleta (1, "Rojo con Negro", "BMX", [4.6558194,-74.1408286]);
var bicib = new Bicicleta (2, "Azul con Blanco", "BMX", [4.6658195,-74.1508287]);
Bicicleta.add(bicia);
Bicicleta.add(bicib);

module.exports = Bicicleta;