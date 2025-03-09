// src/components/NavBar.jsx
import React from 'react';
import { Layout, Button } from 'antd';
import { useKeycloak } from '@react-keycloak/web';

const { Header } = Layout;

const NavBar = () => {
    const { keycloak } = useKeycloak();
    const username =
        keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
            ? keycloak.tokenParsed.preferred_username
            : '未知用户';

    const handleLogout = () => {
        keycloak.logout();
    };

    return (
        <Header
            style={{
                background: '#fff',
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px #f0f1f2',
            }}
        >
            <div className="logo" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Logo
            </div>
            <div>
                <span style={{ marginRight: '10px' }}>{username}</span>
                <Button onClick={handleLogout}>登出</Button>
            </div>
        </Header>
    );
};

export default NavBar;