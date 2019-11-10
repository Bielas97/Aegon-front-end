import axios from 'axios';

const instance = axios.create({
    // ------------------------- PROD -------------------------
    //baseURL: 'https://waw.homeip.net:6981/api/',
    // ------------------------- LOCAL HTTPS -------------------------
    // baseURL: 'https://localhost:8181/api/',
    // ------------------------- LOCAL HTTP -------------------------
    baseURL: 'http://localhost:8181/api/',
    timeout: 6000
});

export default instance;
