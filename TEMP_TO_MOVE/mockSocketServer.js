var server = require('http').createServer();
var config = require('../../config/settings.js');
var WebSocketServer = require('websocket').server;

var uriParts = config.pushServerBasePath.split(/ws:\/\/|:/);
var host = uriParts[1];
var port = uriParts[2];
server.listen(port, host);

server.on('listening', function () {
   console.log('[Mock WebSocket server] Socket server listening on %s:%s', host, port);
});

var wsServer = new WebSocketServer({
   httpServer: server,
   autoAcceptConnections: false
});

wsServer.on('request', function(request) {

   if (request.resource === '/sensitivity-types')
   {
      var sensiTypesConnection = request.accept(null, request.origin);
      console.log('[Mock WebSocket server] Client connected to ' + request.resource);
      wireUpSensiTypesFeed(sensiTypesConnection);
   }

   if (request.resource === '/errors')
   {
      var errorsConnection = request.accept(null, request.origin);
      console.log('[Mock WebSocket server] Client connected to ' + request.resource);
      wireUpErrorsFeed(errorsConnection);
   }
});

function wireUpSensiTypesFeed(connection) {

   var sensiTypesDataStream = require('./mockSensitivityTypesDataSource');

   console.log('[Mock WebSocket server] Subscribing to SensitivityTypes data stream');
   var sensiTypesSubscription = sensiTypesDataStream.subscribe(
      function (data) { connection.send(JSON.stringify(data)); },
      function (err) { connection.send(JSON.stringify(err)); },
      function () {
         console.log('[Mock WebSocket server] SensitivityTypes data stream complete.');
         connection.close();
      }
   );

   connection.on('close', function() {
      console.log('[Mock WebSocket server] Client disconnected. Disposing of SensitivityTypes data stream');
      sensiTypesSubscription.dispose();
   });
}

function wireUpErrorsFeed(connection) {

   var errorsDataStream = require('./mockErrorsDataSource');

   console.log('[Mock WebSocket server] Subscribing to Errors data stream');
   var errorsSubscription = errorsDataStream.subscribe(
      function (data) { connection.send(JSON.stringify(data)); },
      function (err) { connection.send(JSON.stringify(err)); },
      function () {
         console.log('[Mock WebSocket server] Errors data stream complete.');
         connection.close();
      }
   );

   connection.on('close', function() {
      console.log('[Mock WebSocket server] Client disconnected. Disposing of Errors data stream');
      errorsSubscription.dispose();
   });
}