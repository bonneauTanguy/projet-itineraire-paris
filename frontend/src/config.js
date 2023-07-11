import app from '../package.json';

const config = {
    app: { name: app.displayName },
    api: { endpoint: process.env.REACT_APP_SAKURAS_API || 'http://localhost:4000/api' }
}

export default config;