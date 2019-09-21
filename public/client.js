var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket('ws://localhost:3000/', 'echo-protocol');
 
client.onerror = e => {
    console.log('Connection Error', e);
};
 
client.onclose = () => {
    console.log('echo-protocol Client Closed');
};

module.exports = client;