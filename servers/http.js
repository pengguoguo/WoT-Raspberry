var express         = require('express');
var routesCreator   = require('./../routers/routerCreator');
var actuatorsRoutes = require('./../routers/actuators');
var sensorRouters   = require('./../routers/sensors');
var resources       = require('./../resources/model');
var cors            = require('cors');
var bodyParser      = require('body-parser');

var app             = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/pi/sensors',sensorRouters);
app.use('/pi/actuators',actuatorsRoutes);


app.get('/',function (req,res) {
    res.sendfile("../views/index.html");
});

// Create Routes
//app.use('/', routesCreator.create(resources));



module.exports = app;

