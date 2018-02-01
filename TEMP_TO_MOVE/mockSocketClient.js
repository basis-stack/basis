var MessageBrokerService = require('../services/messageBrokerService');
var broker = new MessageBrokerService();

broker.messageStream.subscribe(

   function (m) {
      console.log('\n[Mock WebSocket client] Received: ' + JSON.stringify(m));
   },

   function (err) {
      console.log('\n[Mock WebSocket client] ' + err);
   },

   function () {
      console.log('\n[Mock WebSocket client] Data stream complete');
   }
);

broker.connectToResource('/sensitivity-types');