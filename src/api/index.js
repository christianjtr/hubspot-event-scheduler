import fetch from 'node-fetch';
import HUBSPOT_API_SERVICE_CONFIG from '../config/hubspot.service.config.js';

const { BASE_URL, API_VERSION, API_KEY } = HUBSPOT_API_SERVICE_CONFIG;

export default {
    get: async (url) => {
        const response = await fetch(`${BASE_URL}/${API_VERSION}${url}?userKey=${API_KEY}`);
        return response;
    },
    post: async (url, payload = {}, options = {}) => {
        const response = await fetch(`${BASE_URL}/${API_VERSION}${url}?userKey=${API_KEY}`, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'},
            ...options,
        });
        return response;
    },
};
