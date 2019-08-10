var httpServer = require('./servers/http');
var resources  = require('./resources/model');


//Internal plugins
var ledsPlugin = require('./plugins/internal/ledsPlugin');
var beepPlugin = require('./plugins/internal/beepPlugin');
var bmp280PressurePlugin = require('./plugins/internal/BMP280SensorPlugin');

ledsPlugin.start(1000);

beepPlugin.start();

bmp280PressurePlugin.start();

var server     = httpServer.listen(resources.pi.port,function () {
    console.info('WoT Pi is up and running on port %s',resources.pi.port);
});

process.on('SIGINT',function(){
   ledsPlugin.stop();
   beepPlugin.stop();
   console.log('Bye,bye!');
   process.exit();
});
