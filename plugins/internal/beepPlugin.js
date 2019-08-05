var resources = require('./../../resources/model');

var actuator;

var model      = resources.pi.actuators.beep['1'];
var pluginName = model.name;

var beepProxy;

var beepProxyHandle = {
    set:function(model,vValue,value){
        switchOnOff(model.value);
        return true;
    },
    get:function(model,value){
        return model.value;
    }
};

exports.start = function(){
    //Observe the model for the LEDs
    console.info(model);

    beepProxy = new Proxy(model,beepProxyHandler);

    connectHardware();

};

exports.stop = function(){
    actuator.unexport();
    console.info('%s plugin stopped!',pluginName);
};

exports.beepProxyHandleProcess = function (params) {
    console.info('in beepProxyProcess function');
    console.info(params);
    beepProxy.value = params.value;
}

function connectHardware(){
    //johnny-five, control pcf8574 chip
    var five  = require('johnny-five');

    var board = new five.Board();

    board.on("ready",function(){
        var virtual = new five.Board.Virtual(
            new five.Expander({
                controller:"PCF8574",
                address:0x20
            })
        );
    });

    var beep = new five.Led({pin:12,board:virtual});

    beep.on();

    console.info('Hardware %s actuator started!',pluginName);
};

function switchOnOff(value){
    console.info(value);
    actuator.writeSync(value === true ? 1 : 0);
};