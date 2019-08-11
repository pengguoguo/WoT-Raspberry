var resources = require('./../../resources/model');

var pressureModel = resources.pi.sensors.pressure;

var pressurePluginName = resources.pi.sensors.pressure.name;

var pressurelocalParams;

exports.start = function (params) {
    pressurelocalParams = params;

    connectHardware();
};

exports.stop = function(params) {
    //sensor.unexport();
};

function connectHardware(){

    var five  = require('johnny-five');
    var Raspi = require('raspi-io').RaspiIO;
    var board = new five.Board({
        io: new Raspi({
            enableI2C:true
        }),
        repl: false
    });

    board.on('ready',function(){

        console.info("board.on.ready");

        var bmp180Multi = new five.Barometer({
            controller: "BMP180",
        });

        bmp180Multi.on("changer",function(){
            console.log("Barometer");
            console.log("  pressure     : ", this.pressure);
            console.log("--------------------------------------");
        })
    });
};
