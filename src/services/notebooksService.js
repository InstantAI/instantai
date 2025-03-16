// src/services/notebooksService.js
import axios from 'axios';
import config from '../config/default.json';
import { getToken } from '../authService'; // 或通过 Context 获取 token

const API_BASE = `${config.backend}/api`;

export const getWorkspaces = async () => {
    const token = getToken();
    const response = await axios.get(`${API_BASE}/workspaces`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getNotebooks = async (namespace) => {
    const token = getToken();
    const response = await axios.get(`${API_BASE}/notebooks/${namespace}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const saveNotebook = async (namespace, notebookData) => {
    const token = getToken();
    const response = await axios.post(`${API_BASE}/notebooks/${namespace}`, notebookData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const startNotebook = async (namespace, name) => {
    const token = getToken();
    const response = await axios.put(`${API_BASE}/notebooks/${namespace}/${name}/status`, null, {
        params: {
            action: 'start'
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const stopNotebook = async (namespace, name) => {
    const token = getToken();
    const response = await axios.put(`${API_BASE}/notebooks/${namespace}/${name}/status`, null, {
        params: {
            action: 'stop'
        },
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};