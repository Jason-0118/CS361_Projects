const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 361 });

wss.on("connection", ws => {
    
    ws.on("message", data => {
        console.log(`Client to Server: ${data}`);
        ws.send(data.toString().toUpperCase());
    });

});