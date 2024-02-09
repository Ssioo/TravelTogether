class BaseApi {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async get(endpoint: string): Promise<any> {
        if (!endpoint.startsWith('/')) {
            throw new Error('Endpoint must start with /');
        }
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    }

    protected async post(endpoint: string, body: any): Promise<any> {
        const url = `${this.baseUrl}/${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    }

    // Add more methods for other HTTP methods (PUT, DELETE, etc.) as needed
}

export { BaseApi };