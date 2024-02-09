"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = __importDefault(require("ws"));
const webSocketServer = new ws_1.default.Server({ port: +((_a = process.env.WS_PORT) !== null && _a !== void 0 ? _a : 9000) });
//For env File 
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// accept cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
// Websocket endpoint
app.get('/ws/connect', (req, res) => {
    webSocketServer.on('connection', (ws) => {
        ws.on('message', (message) => {
            console.log(`Received message => ${message}`);
            ws.send(`Received message => ${message}`);
        });
        ws.on('close', () => {
            console.log('Client has disconnected');
        });
        ws.send('Welcome to WebSocket Server');
    });
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
