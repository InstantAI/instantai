// src/services/notebooksService.js
import axios from 'axios';
import config from '../config/default.json';

const API_BASE = `${config.backend}/api/notebooks`;

export const getNotebooks = async (namespace, token) => {
    const response = await axios.get(`${API_BASE}/${namespace}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const saveNotebook = async (namespace, notebookData, token) => {
    const response = await axios.post(`${API_BASE}/${namespace}`, notebookData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

// 其他接口同理……