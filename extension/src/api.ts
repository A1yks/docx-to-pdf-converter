import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    adapter: 'fetch',
    headers: {
        'Intercept-Me': 1,
    },
});
