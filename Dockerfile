#_____________________________ Builder Stage __________________________
FROM node:14.15.1 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY ./src ./src

RUN npm install --quiet && npm run build

#__________________________ Production Stage ___________________________
FROM node:14.15.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install knex -g 

RUN npm install --quiet --only=production

COPY --from=builder /usr/src/app/build ./build

EXPOSE 8081

CMD ["sh","-c", "node ./build/app.js"]