// src/components/NavBar.jsx
import React, { useContext } from 'react';
import { Layout, Button } from 'antd';
import { AuthContext } from '../AuthContext';
import logo from '../assets/logo.svg';

const { Header } = Layout;

const NavBar = () => {
    const { username, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
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
            <div className="logo" style={{fontWeight: 'bold', fontSize: '18px'}}>
                Instant AI
            </div>
            <div>
                <span style={{ marginRight: '10px' }}>
                    {username || '未知用户'}
                </span>
                <Button onClick={handleLogout}>登出</Button>
            </div>
        </Header>
    );
};

export default NavBar;