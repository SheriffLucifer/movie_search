import axios from 'axios';

const API_KEY = '4a230cb73424c4479403ddeba0cabdbf';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

export default api;
