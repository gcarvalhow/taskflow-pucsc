FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=infra/prisma/schema.prisma

EXPOSE 3001
CMD npx prisma migrate deploy --schema=infra/prisma/schema.prisma && npm start