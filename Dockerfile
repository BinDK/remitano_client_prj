# Using alpine to build react app

FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL:-http://localhost:3000}" > .env
RUN echo "REACT_APP_CABLE_URL=${REACT_APP_CABLE_URL:-ws://localhost:3000/cable}" >> .env
RUN npm run build

# Final stage

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE ${PORT:-80}

CMD sh -c "sed -i -e 's/listen 80;/listen '${PORT:-80}';/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
