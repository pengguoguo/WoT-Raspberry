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

    req.value         = selectedLed;

    switch(selectedLed.value)
    {
        case 26:
            ledsPlugin.ledproxy_process(selectedLed);
            break;
        case  9:
            break;
    }



    next();
});

router.route('/beep').get(function(req,res,next){
   res.send(resources.pi.actuators.beep);
});

router.route('/beep/:id').get(function(req,res,next){
    res.send(resources.pi.actuators.beep[req.params.id]);
    next();
});

router.route('/beep/:id').put(function(req,res,next){
    var selectedBeep = resources.pi.actuators.beep[req.params.id];

    switch(selectedBeep.value)
    {
        case 1:

            break;
    }

    next();
});

module.exports = router;
