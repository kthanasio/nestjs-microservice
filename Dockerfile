FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g glob rimraf @nestjs/cli

RUN npm install --force

ADD ./src /app

# EXPOSE 3001

CMD ["npm", "run", "start"]
