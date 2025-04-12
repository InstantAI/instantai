FROM nginx:1.18.0-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY 100-init-project-env-variables.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/100-init-project-env-variables.sh
COPY ./dist/ /usr/share/nginx/html/
