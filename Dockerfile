FROM node:current-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

WORKDIR /app/

RUN npm run build

EXPOSE 3300

ENV HOST=0.0.0.0
CMD ["node", "build"]
