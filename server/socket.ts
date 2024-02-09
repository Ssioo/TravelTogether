import websocket from 'ws';
import dotenv from 'dotenv';


//For env File 
dotenv.config();

let sockets: websocket[] = [];

module.exports = (server: any) => {
    const wss = new websocket.Server({ port: +(process.env.WS_PORT ?? 9000) });
    
    wss.on('connection', (ws: websocket) => {
        sockets.push(ws);

        ws.onmessage = (event: websocket.MessageEvent) => {
            console.log(`Received message => ${event.data}`);
            for (const socket of sockets) {
                if (socket === ws) continue;
                socket.send(event.data);
            }
        }

        ws.close = (code?: number, reason?: string) => {
            console.log(`Disconnected from client with code ${code} and reason ${reason}`);
            const idx = sockets.indexOf(ws);
            if (idx > -1) {
                sockets.splice(idx, 1);
            }
        };
        
        ws.send(JSON.stringify({
            eventType: "open",
            success: true
        }));
    });
    
}