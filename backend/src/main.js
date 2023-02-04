'use strict';

import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port: 8080,
});

wss.on('connection', (ws, request) => {

    // console.log('request: ', request);

    ws.on('error', e => {
        console.log('error: ', e);
    });

    ws.on('message', (data, isBinary) => {
        console.log('new message: ', data);
    });

});