import { assert } from 'console';
import { BaseApi } from './base';

class WsApi extends BaseApi {
    private ws: WebSocket | null = null;
    
    constructor(baseUrl: string) {
        super(`${baseUrl}/ws`);
    }

    public init() {
        this.ws = new WebSocket(this.baseUrl);
    }

    public close() {
        this.ws?.close();
    }

    // Connect websocket of the server, endpoint is /ws/connect, and receive message from server continuously
    async connect() {
        this.ws!.onopen = () => {
            console.log('Connected to server');
        };
        this.ws!.onmessage = (event) => {
            console.log(`Received message => ${event.data}`);
        };
        this.ws!.onclose = () => {
            console.log('Disconnected from server');
        };
    }
}
