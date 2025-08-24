import {WebSocket, WebSocketServer} from 'ws';
import { GamaManager } from './GameManager';

const wss = new WebSocketServer({port: 8080});
const gameManager = new GamaManager();

wss.on('connection', (ws: WebSocket) => {
    gameManager.addUser(ws);
    console.log('New connection established');
});

wss.on('close', (ws: WebSocket) => {
    gameManager.removeUser(ws);
    console.log('Connection closed');
});