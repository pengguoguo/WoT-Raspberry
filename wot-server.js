var httpServer = require('./servers/http');
var resources  = require('./resources/model');


//Internal plugins
var ledsPlugin = require('./plugins/internal/ledsPlugin');

var ledproxy = ledsPlugin.start(1000);

var server     = httpServer.listen(resources.pi.port,function () {
    console.info('WoT Pi is up and running on port %s',resources.pi.port);
});

console.info(ledproxy);

module.exports = ledproxy;

process.on('SIGINT',function(){
   ledsPlugin.stop();
   console.log('Bye,bye!');
   process.exit();
});
