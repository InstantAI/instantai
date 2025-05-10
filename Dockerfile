FROM nginx:1.18.0-alpine

# Add build arguments
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION

# Add labels for better traceability
LABEL org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.source="https://github.com/${GITHUB_REPOSITORY}" \
      org.opencontainers.image.revision="${VCS_REF}" \
      org.opencontainers.image.version="${VERSION}" \
      org.opencontainers.image.vendor="InstantAI" \
      org.opencontainers.image.title="InstantAI" \
      org.opencontainers.image.description="InstantAI Frontend Application"

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY 100-init-project-env-variables.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/100-init-project-env-variables.sh
COPY ./dist/ /usr/share/nginx/html/
