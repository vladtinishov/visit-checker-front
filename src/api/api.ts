import axios from "axios";

export const API = axios.create({
    baseURL: 'https://visit-checker-back-production.up.railway.app',
    // baseURL: 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});