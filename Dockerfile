FROM node:18-alpine
LABEL authors="decagondev"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npx prisma db push dev

RUN npm run build

EXPOSE 3333/tcp

CMD [ "node", "dist/main.js" ]
