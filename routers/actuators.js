var express = require('express');
var router  = express.Router();
var resources = require('./../resources/model');

router.route('/').get(function(req,res,next){
   res.send(resources.pi.actuators);
});

router.route('/leds').get(function(req,res,next){
    res.send(resources.pi.actuators.leds);
});

router.route('/leds/:id').get(function(req,res,next){
    res.send(resources.pi.actuators.leds[req.params.id]);
});

router.route('beep').get(function(req,res,next){
   res.send(resources.pi.actuators.beep);
});

router.route('beep/:id').get(function(req,res,next){
    res.send(resources.pi.actuators.beep[req.params.id]);
});

module.exports = router;
