#  =============== 
#  Build Stage
# ===============
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# =============== 
#  RUn Stage
# ===============
FROM node:22-alpine

WORKDIR /app

# ========== ENV From ARGS 
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
# =========

COPY package*.json ./

COPY prisma ./

COPY --from=builder /app/dist ./dist

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]