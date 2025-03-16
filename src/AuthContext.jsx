// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import * as AuthService from './authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        AuthService.initKeycloak(() => {
            setAuthenticated(true);
            const tokenParsed = AuthService.getTokenParsed();
            if (tokenParsed && tokenParsed.preferred_username) {
                setUsername(tokenParsed.preferred_username);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                username,
                isAuthenticated,
                login: AuthService.login,
                logout: AuthService.logout,
                getToken: AuthService.getToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};