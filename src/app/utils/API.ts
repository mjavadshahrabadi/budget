import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 3000,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(async (config) => {
    if (typeof window !== undefined) {
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = token;
        }
    }
    return config;
});

export default instance;
