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
    var raspi = require('raspi-io').RaspiIO;
    var board = new five.Board({
        io:new raspi(),
        repl:false
    });

    board.on('ready',function(){
        var bmp280Pressure = new five.Altimeter({
            controller: "BMP280",
            elevation:12
        });

        bmp280Pressure.on("change",function () {
            console.info("Altimeter");
            console.info(this.feet);
            console.info(this.meters);
            console.info("......................................");
        });
    });
};
