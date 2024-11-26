FROM node:20-alpine

WORKDIR /app

COPY package* ./
COPY prisma ./prisma

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]