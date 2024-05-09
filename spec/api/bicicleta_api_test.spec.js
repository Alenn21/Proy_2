var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require ('../../bin/www');


describe('Bicicleta API', () =>{
    describe('GET BICICLETAS /', () => {
        it('Status 200', () =>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var bicia = new Bicicleta (1, "Rojo con Negro", "BMX", [4.6558194,-74.1408286]);
            Bicicleta.add(bicia);
            request.get('http://localhost:3000/api/bicicletas', function (error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });
});

describe('POST BICICLETAS /', () => {
    it('Status 200', (done) =>{ //el done es un callback que se ejecuta al final, es lo que espera jasmin apra finalizar el test
        var headers = {'content-type' : 'application/json'};
        var bicia = '{ "id" : 10, "color" : "Rojo con Negro", "modelo" : "BMX", "lat": 4.6558194, "lng": -74.1408286 }';
        request.post({
            headers : headers,
            url : 'http://localhost:3000/api/bicicletas/create',
            body : bicia }, function (error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("Rojo con Negro");
                done();
            });    
    });
});

describe('PUT BICICLETAS /', () => {
    it('Status 200', (done) =>{ //el done es un callback que se ejecuta al final, es lo que espera jasmin apra finalizar el test
        var headers = {'content-type' : 'application/json'};
        var bicia = '{ "id" : 10 , "color": "Azul"}';
        request.put({
            headers : headers,
            url : 'http://localhost:3000/api/bicicletas/update',
            body : bicia }, function (error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("Azul");
                done();
            });    
    });
});

describe('DELETE BICICLETAS /', () => {
    it('Status 204', (done) =>{ //el done es un callback que se ejecuta al final, es lo que espera jasmin apra finalizar el test
        var headers = {'content-type' : 'application/json'};
        var bicia = '{ "id" : 10 }';
        request.delete({
            headers : headers,
            url : 'http://localhost:3000/api/bicicletas/delete',
            body : bicia }, function (error, response, body){
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.allBicis.length).toBe(1);
                done();
            });    
    });
});


