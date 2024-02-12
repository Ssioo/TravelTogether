import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { initWss } from './socket';

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

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});

// Start websocket server
initWss(+(process.env.WS_PORT ?? 9000));
