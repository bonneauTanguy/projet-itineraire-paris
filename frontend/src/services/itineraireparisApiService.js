import axios from 'axios';
import config from '../config';

const apiService = axios.create({
    withCredentials: true,
    baseURL: config.api.endpoint,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const itineraireparisApiService = apiService;