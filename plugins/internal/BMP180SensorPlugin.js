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
        io: new Raspi(),
        repl: false
    });

    board.on('ready',() => {
        var bmp180Multi = new five.IMU({
            controller: "BMP180",
            elevation:12,
            freq:100,

        });

        bmp180Multi.on("changer",function(){
            console.log("Thermometer");
            console.log("  celsius      : ", this.computed.temperature);
            console.log("--------------------------------------");

            console.log("Barometer");
            console.log("  pressure     : ", this.computed.pressure);
            console.log("--------------------------------------");

            console.log("Altimeter");
            console.log("  feet         : ", this.computed.altitude);
            console.log("--------------------------------------");
        })
    });
};
