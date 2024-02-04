import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import websocket from 'ws';
const webSocketServer = new websocket.Server({ port: +(process.env.WS_PORT ?? 9000) });


//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// Websocket endpoint
app.get('/ws/connect', (req: Request, res: Response) => {
    webSocketServer.on('connection', (ws: websocket) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip);
        
        ws.on('message', (message: string) => {
            console.log(`Received message => ${message}`);
            ws.send(`Received message => ${message}`);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});