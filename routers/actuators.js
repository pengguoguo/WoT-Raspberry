var express = require('express');
var router  = express.Router();
var resources = require('./../resources/model');

var ledsPlugin = require('./../plugins/internal/ledsPlugin');

router.route('/').get(function(req,res,next){
   res.send(resources.pi.actuators);
});

router.route('/leds').get(function(req,res,next){
    res.send(resources.pi.actuators.leds);
});

router.route('/leds/:id').get(function(req,res,next){
    res.send(resources.pi.actuators.leds[req.params.id]);
    next();
}).put(function (req,res,next) {
    var selectedLed   = resources.pi.actuators.leds[req.params.id];
    selectedLed.value = req.body.value;
    console.info('Changed LED %s value to %s',req.params.id,selectedLed.value);

    console.info(selectedLed);

    req.value         = selectedLed;

    ledsPlugin.ledproxy_process(selectedLed);

    next();
});

router.route('/beep').get(function(req,res,next){
   res.send(resources.pi.actuators.beep);
});

router.route('/beep/:id').get(function(req,res,next){
    res.send(resources.pi.actuators.beep[req.params.id]);
});

module.exports = router;
