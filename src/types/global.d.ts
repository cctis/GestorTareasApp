declare global {
    interface Window {
        APP_CONFIG: {
            API_URL: string;
            USER: string;
            PASSWORD: string;
        };
    }
}

export {};
