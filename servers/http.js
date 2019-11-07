var express         = require('express');
//var routesCreator   = require('./../routers/routerCreator');
var routers         = require('./../routers');
var actuatorsRoutes = require('./../routers/actuators');
var sensorRouters   = require('./../routers/sensors');
var resources       = require('./../resources/model');
var cors            = require('cors');
var bodyParser      = require('body-parser');

var app             = express();

app.set('view engine','ejs');

app.use(bodyParser.json());

app.use(cors());


app.use('/pi/sensors',sensorRouters);
app.use('/pi/actuators',actuatorsRoutes);


app.get('/',routers.index);

// Create Routes
//app.use('/', routesCreator.create(resources));



module.exports = app;

