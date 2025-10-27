FROM node:22 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine


WORKDIR /app

COPY package*.json ./
COPY prisma ./
COPY .env ./

# Copy built TypeScript files
COPY --from=builder /app/dist ./dist

RUN npm install --production
RUN npm run prisma:generate

# Expose port if needed
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
