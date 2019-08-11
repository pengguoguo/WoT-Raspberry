var express = require('express');
var router  = express.Router();
var resources = require('./../resources/model');

router.route('/').get(function(req,res,next){
    res.send(resources.pi.sensors);
});

router.route('/pressure').get(function(req,res,next){
   res.send(resources.pi.sensors.pressure);
});

router.route('/altitude').get(function (req,res,next) {
    res.send(resources.pi.sensors.altitude);
})

router.route('/temperature').get(function(req,res,next){
   res.send(resources.pi.sensors.temperature);
});

module.exports = router;
