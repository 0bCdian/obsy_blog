# Base stage for building the static files
FROM node:iron-bullseye AS base
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Runtime stage for serving the application
FROM nginx:mainline-alpine-slim AS runtime
COPY --from=base ./app/dist /usr/share/nginx/html
COPY --from=base ./app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
