'use strict';

var Rx = require('rx');
var WebSocketClient = require('websocket').client;

var MessageBrokerService = function() {

    var _this = this;
    this._hostPath = require('../../config/settings.js').pushServerBasePath;
    this._client = new WebSocketClient();

    this.messageStream = Rx.Observable.create(function (o) {
        _this._messageObserver = o;
        return function () {};
    })
    .share();

    this._client.on('connectFailed', function(error) {
        _this._messageObserver.onError('[Message Broker] Connection Failed Error. ' + error);
    });

    this._client.on('connect', function(connection) {

        setInterval(function() { connection.ping({}); }, 1000);

        connection.on('error', function(error) {
            _this._messageObserver.onError('[Message Broker] General Error. ' + error);
        });

        connection.on('close', function() {
            _this._messageObserver.onCompleted();
        });

        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                _this._messageObserver.onNext(JSON.parse(message.utf8Data));
            }
        });
    });
};

MessageBrokerService.prototype.connectToResource = function (resource) {

    var path = this._hostPath + resource;
    console.log('[Message Broker] WS client connecting to ' + path);

    this._client.connect(path, null);
};

module.exports = MessageBrokerService;