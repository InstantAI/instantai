# InstantAI

[English](#english) | [中文](README-zh.md)

<a name="english"></a>
# InstantAI - Lightweight AI Training Platform

InstantAI is a lightweight AI training and machine learning platform based on Kubernetes, designed as an alternative to Kubeflow. It provides a streamlined solution for AI development and deployment in enterprise environments.

![InstantAI Platform](public/images/instantai-platform.png)

> ⚠️ **Note**: This project is currently under active development. It is not recommended for production use at this stage.

## Key Features

- **Lightweight Architecture**: Single-core component design with one-click installation
- **Enterprise-Grade Security**: Complete permission control using Keycloak for authentication and authorization
- **Space-Level Authorization**: Granular access control for individual workspaces
- **Jupyter Notebooks**: Integrated Jupyter environment running in Kubernetes for development and debugging
- **Streamlined UI**: Clean and intuitive user interface for efficient management

## Quick Start

### Prerequisites

The following versions are recommended (other versions may work but are not tested):

- Kubernetes 1.31+
- Keycloak 25.2
- PostgreSQL 17

### Preparation

1. Create a database named `instantai` and set up authorized user credentials
2. Apply for domain names and SSL certificates (separate domains needed for frontend and backend)

### Installation

1. Prepare backend configuration file `values-backend.yaml`:
```yaml
ingress:
  enabled: true
config:
  database:
    host: localhost
    port: 30000
    name: instantai-api
    username: instantai
    password: instantai
  keycloak:
    baseUrl: https://keycloak.instant.ai
    realm: master
    client:
      id: instantai
      secret: c0VqkTiSUIMhSn8D4tlgKHC5UZAGZOjY
      name: litetest
      redirectUri: "{baseUrl}/login/oauth2/code/{registrationId}"
      scope: openid, profile, email
      grantType: authorization_code
```

2. Prepare frontend configuration file `values-front.yaml`:
```yaml
env:
  VITE_KEYCLOAK_URL: "https://keycloak.instant.ai"
  VITE_KEYCLOAK_REALM: "master"
  VITE_KEYCLOAK_CLIENT: "instantai-web"
  VITE_BACKEND_URL: "https://lab.instant.ai"
```

3. Install using Helm:
```bash
# Install backend
helm -n cloud upgrade instantai-api -f values-backend.yaml oci://ghcr.io/instantai/charts/instantai-api

# Install frontend
helm -n cloud upgrade instantai oci://ghcr.io/instantai/charts/instantai -f values-front.yaml
```

4. Access the platform at: https://console.instant.ai/
