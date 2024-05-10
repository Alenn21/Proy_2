// Diego Alejandro Vega Bohórquez 
// Importa el módulo 'http-errors' para manejar errores HTTP
var createError = require('http-errors');
// Importa el módulo 'express' para crear una aplicación Express
var express = require('express');
// Importa el módulo 'path' para manejar rutas de archivos y directorios
var path = require('path');
// Importa el módulo 'cookie-parser' para manejar cookies en la solicitud
var cookieParser = require('cookie-parser');
// Importa el módulo 'logger' para registrar solicitudes HTTP
var logger = require('morgan');

// Importa las rutas definidas en diferentes archivos
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var usuariosAPIRouter = require('./routes/api/usuarios');

var mongoose = require('mongoose');
// Crea una nueva aplicación Express
var app = express();



var mongoDB = 'mongodb://127.0.0.1/red_bicicletas';
mongoose.connect(mongoDB).then(db => console.log("Esta conectada la bd")) //FUNCION DE FLECHA
.catch(err => console.log(err));//{useNewUrlParser: true}
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error: '));


// Configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares para manejar solicitudes HTTP
//Un middleware en el contexto de una aplicación web es una función que se
//ejecuta en el medio del proceso de manejo de una solicitud HTTP y la 
//generación de una respuesta. Estas funciones tienen acceso al objeto de
//solicitud (req), al objeto de respuesta (res), y a la función next que 
//se utiliza para pasar el control al siguiente middleware en la cadena de middleware.
app.use(logger('dev')); // Registra las solicitudes HTTP en la consola en modo desarrollo
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.urlencoded({ extended: false })); // Middleware para analizar el cuerpo de la solicitud en formato urlencoded
app.use(cookieParser());  // Middleware para analizar las cookies en la solicitud
app.use(express.static(path.join(__dirname, 'public')));  // Middleware para servir archivos estáticos desde el directorio 'public'

// Asocia las rutas a los diferentes endpoints de la aplicación
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', usuariosAPIRouter);



// Middleware para manejar errores 404 (recurso no encontrado)
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware para manejar errores
app.use(function(err, req, res, next) {
  // Establece las variables locales solo para proporcionar un error en el desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la página de error
  res.status(err.status || 500);
  res.render('error');
});
// Exporta la aplicación para que pueda ser utilizada por otros archivos
module.exports = app;
