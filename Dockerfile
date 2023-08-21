FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

USER node

EXPOSE 4000
CMD ["npm", "run", "start:dev"]