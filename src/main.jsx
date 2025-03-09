// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'login-required' }} // 自动跳转到登录页面
    >
        <App />
    </ReactKeycloakProvider>
);