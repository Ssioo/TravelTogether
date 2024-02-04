import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import websocket from 'ws';

const webSocketServer = new websocket.Server({ port: +(process.env.WS_PORT ?? 9000) });

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// accept cors
app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// Websocket endpoint
app.get('/ws/connect', (req: Request, res: Response) => {
    webSocketServer.on('connection', (ws: websocket) => {

        ws.on('message', (message: string) => {
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