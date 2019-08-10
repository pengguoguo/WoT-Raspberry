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
        Repl: false
    });

    board.on('ready',() => {
        var bmp180Multi = new five.Multi({
            controller: "BMP180"
        });

        bmp180Multi.on("changer",function(){
            console.log("Thermometer");
            console.log("  celsius      : ", this.thermometer.celsius);
            console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
            console.log("  kelvin       : ", this.thermometer.kelvin);
            console.log("--------------------------------------");

            console.log("Barometer");
            console.log("  pressure     : ", this.barometer.pressure);
            console.log("--------------------------------------");

            console.log("Altimeter");
            console.log("  feet         : ", this.altimeter.feet);
            console.log("  meters       : ", this.altimeter.meters);
            console.log("--------------------------------------");
        })
    });
};
