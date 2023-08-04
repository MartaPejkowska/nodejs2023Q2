FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci && npm cache clean --force
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

USER node

EXPOSE 4000
CMD [ "node", "dist/main.js" ]