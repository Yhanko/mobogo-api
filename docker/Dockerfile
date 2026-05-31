FROM node:20-alpine

RUN apk add --no-cache dumb-init

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "start:dev"]