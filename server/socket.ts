import websocket from 'ws';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

export const initWss = (port: number) => {
    const wss = new websocket.Server({ port: port, path: '/connect' });
    wss.on('connection', (ws: websocket) => {
        ws.send(JSON.stringify({
            eventType: "open",
            success: true
        }));
        
        ws.onmessage = (event: websocket.MessageEvent) => {
            console.log(`Received message => ${event.data}`);
            wss.clients.forEach((client) => {
                if (client.readyState === websocket.OPEN) {
                    client.send(event.data);
                }
            });
        }
        
        ws.close = (code?: number, reason?: string) => {
            console.log(`Disconnected from client with code ${code} and reason ${reason}`);
            wss.clients.forEach((client) => {
                if (client.readyState === websocket.OPEN) {
                    client.send(JSON.stringify({
                        eventType: "close",
                        success: true
                    }));
                }
            });
            if (wss.clients.size === 0) {
                console.log('No more clients connected. Closing server.');
                wss.close();
            }
        };
        
    });
    
}