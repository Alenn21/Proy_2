var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){
   
    beforeEach(function(done){
        var mongoDB = 'mongodb://127.0.0.1/testdb';
        mongoose.connect(mongoDB); 
    
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test DB');
            done();
        });
    });
    
    afterEach(function(done){
        Bicicleta.deleteMany({})
            .then(() => done()) // Llamamos done() cuando la operación es exitosa
            .catch(err => console.error(err)); // Manejamos el error si ocurre
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de bicicleta', () => {
            var bici = Bicicleta.createInstance(21, "Rojo con Negro", "BMX", [4.6558194, -74.1408286]);
            console.log("Cree a bici: "+bici.toString());
            expect(bici.code).toBe(21);
            expect(bici.color).toBe("Rojo con Negro");
            expect(bici.modelo).toBe("BMX");
            expect(bici.ubicacion[0]).toEqual(4.6558194);
            expect(bici.ubicacion[1]).toEqual(-74.1408286);
        });
   });
   /*
   describe('Bicicleta.allBicis', () => {
    console.log("Entrando al describe de Bicicleta.allBicis"); // Agregamos un mensaje de depuración para verificar si el describe se llama correctamente
    
        it('Comienza Vacia', (done) => {
            console.log("Entrando a la prueba allBicis"); // Agregamos una declaración de consola para verificar si la prueba está siendo llamada
            
            Bicicleta.allBicis(function(err, bicicletas) {
                if (err) {
                    console.error("Error al obtener las bicicletas:", err);
                    done.fail(err); // Si hay un error, fallamos la prueba con el error
                } else {
                    console.log("Todas las bicicletas:", bicicletas);
                    expect(bicicletas.length).toBe(0); // Verificamos que no haya bicicletas al inicio
                    done(); // Indicamos que la prueba ha finalizado correctamente
                }
            });
        });
    });*/
    
    describe('Bicicleta.add', () => {
        it('Agrega solo una bici', (done) => {
            var bici = Bicicleta.createInstance(21, "Rojo con Negro", "BMX", [4.6558194, -74.1408286]);
            Bicicleta.add(bici)
                .then(() => {
                    return Bicicleta.allBicis(); // Consulta todas las bicicletas después de agregar una
                })
                .then((bicicletas) => {
                    expect(bicicletas.length).toEqual(1); // Asegúrate de que haya una sola bicicleta después de agregarla
                    done(); // Indica que la prueba ha finalizado correctamente
                })
                .catch((error) => {
                    done.fail(error); // Si ocurre un error, falla la prueba
                });
        });
    });
    

   /*
   describe('Bicicleta.findByOne', () => {
        it('debe devolver la bici con code 1', (done) =>{
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);

                var aBici = new Bicicleta ({ code: 1, color: "Rojo con Negro", modelo: "BMX", ubicacion: [4.6558194, -74.1408286] });
                Bicicleta.add(aBici, function(err, newBici){
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta ({ code: 2, color: "Rojo con Blanco", modelo: "Urbana", ubicacion: [4.6658194, -74.1498286] });
                    Bicicleta.add(aBici2, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.findByCode(1, function (err, targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                        });
                    });
                });
            });
        });
   });
   */


});


/*
beforeEach(() => {Bicicleta.allBicis =[]; });
describe('Bicicleta.allBicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('Agregamos una Bici', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var bicia = new Bicicleta (1, "Rojo con Negro", "BMX", [4.6558194,-74.1408286]);
        Bicicleta.add(bicia);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(bicia);                
    });
});

describe('Bicicleta.findById', () => {
    it('Debe devolver la Bici con ID= 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var bicia = new Bicicleta (1, "Rojo con Negro", "BMX", [4.6558194,-74.1408286]);
        var bicib = new Bicicleta (2, "Azul con Blanco", "BMX", [4.6658195,-74.1508287]);
        Bicicleta.add(bicia);
        Bicicleta.add(bicib);
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(bicia.id);
        expect(targetBici.color).toBe(bicia.color);   
        expect(targetBici.modelo).toBe(bicia.modelo);                  
    });
});

describe('Bicicleta.removeById', () => {
    it('Debe Eliminarse la Bici con ID= 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var bicia = new Bicicleta (1, "Rojo con Negro", "BMX", [4.6558194,-74.1408286]);
        Bicicleta.add(bicia);
        expect(Bicicleta.allBicis.length).toBe(1); 
        Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);                 
    });
}); */
