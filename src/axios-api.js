import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://waw.homeip.net:6981/api/',
    timeout: 4000
});

export default instance;
