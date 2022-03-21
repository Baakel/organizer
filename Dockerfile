FROM node:current-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

WORKDIR /app/

RUN npm run build

FROM node:current-alpine

COPY --from=build /app /

EXPOSE 3300

ENV HOST=0.0.0.0
CMD ["node", "build"]
