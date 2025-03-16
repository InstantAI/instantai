// authService.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://keycloak.instant.ai/',
    realm: 'master',
    clientId: 'instantai-web'
});

/**
 * 初始化 Keycloak，并在认证成功后调用回调
 */
export const initKeycloak = (onAuthenticatedCallback) => {
    keycloak
        .init({ onLoad: 'login-required' })
        .then((authenticated) => {
            if (authenticated) {
                onAuthenticatedCallback();
            } else {
                keycloak.login();
            }
        })
        .catch((error) => {
            console.error('Keycloak 初始化失败', error);
        });
};

/**
 * 获取当前 token
 */
export const getToken = () => keycloak.token;

export const getTokenParsed = () => keycloak.tokenParsed;

/**
 * 触发登录
 */
export const login = () => keycloak.login();

/**
 * 触发登出
 */
export const logout = () => keycloak.logout();