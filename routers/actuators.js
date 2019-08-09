var express = require('express');
var router  = express.Router();
var resources = require('./../resources/model');

var ledsPlugin = require('./../plugins/internal/ledsPlugin');
var beepPlugin = require('./../plugins/internal/beepPlugin');

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

    var ledid = req.params.id;

    switch(ledid)
    {
        case '2':
            ledsPlugin.ledproxy_process(selectedLed);
            break;
        case '1':
            beepPlugin.ledProxyHandleProcess(selectedLed);
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

    selectedBeep.value = req.body.value;

    switch(req.params.id)
    {
        case '1':
            beepPlugin.beepProxyHandleProcess(selectedBeep);
            break;
    }

    next();
});

module.exports = router;
