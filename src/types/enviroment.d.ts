export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string;
            PORT: string;
            SECRETE: string;
            ENV: 'test' | 'dev' | 'prod';
        }
    }
}
