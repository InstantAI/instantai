type ProjectEnvVariablesType = Pick<ImportMetaEnv, 'VITE_KEYCLOAK_URL' | 'VITE_KEYCLOAK_REALM' | 'VITE_KEYCLOAK_CLIENT' | 'VITE_BACKEND_URL'>;

export const getProjectEnvVariables = (): { envVariables: ProjectEnvVariablesType } => {
  return {
    envVariables: {
      VITE_KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
      VITE_KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
      VITE_KEYCLOAK_CLIENT: import.meta.env.VITE_KEYCLOAK_CLIENT,
      VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    }
  };
};
