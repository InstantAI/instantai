import Keycloak from "keycloak-js";
import { getProjectEnvVariables } from "../shared/projectEnvVariables";

const { envVariables } = getProjectEnvVariables()

const _kc = new Keycloak({
  url: envVariables.VITE_KEYCLOAK_URL,
  realm: envVariables.VITE_KEYCLOAK_REALM,
  clientId: envVariables.VITE_KEYCLOAK_CLIENT,
})

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback: any) => {
  _kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
      if (!authenticated) {
        _kc.login();
      } else {
        onAuthenticatedCallback();
      }
    })
    .catch((err) => {
      console.error('Keycloak init error:', err);
    });
};
function timestampToDate(timestamp: any) {
  let date = new Date(timestamp * 1000);
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2); // +1是由于月份在JavaScript中从0开始计数
  let day = ('0' + date.getDate()).slice(-2);
  let hour = ('0' + date.getHours()).slice(-2);
  let minute = ('0' + date.getMinutes()).slice(-2);
  let second = ('0' + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

const doLogin = _kc.login;
const doLogout = _kc.logout;
const getToken = () => _kc.token;
const isLoggedIn = () => !!_kc.token;
const updateToken = (successCallback: any) => _kc.updateToken(-1).then(successCallback).catch(doLogin);

const getUsername = () => isLoggedIn() ? _kc.tokenParsed?.preferred_username ?? 'Unknown' : ''
const getName = () => isLoggedIn() ? _kc.tokenParsed?.name ?? 'Unknown' : ''
const getFamilyName = () => isLoggedIn() ? _kc.tokenParsed?.family_name ?? 'Unknown' : ''
const getGivenName = () => isLoggedIn() ? _kc.tokenParsed?.given_name ?? 'Unknown' : ''
const getAvatarLetter = () => getGivenName().length ? getGivenName().charAt(0) : '游'
const getEmail = () => isLoggedIn() ? _kc.tokenParsed?.email ?? 'Unknown' : ''

const hasRole = (roles: any) => roles.some((role: any) => _kc.hasRealmRole(role));
const isAdmin = () => _kc.hasResourceRole("admin", "cloud")
const getExp = () => timestampToDate(_kc.tokenParsed?.exp)
const getGroups = () => _kc.tokenParsed?.groups || []
const UserService = {
  _kc,
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getName,
  getFamilyName,
  getGivenName,
  getAvatarLetter,
  getEmail,
  hasRole,
  isAdmin,
  getExp,
  getGroups,
};

export default UserService;