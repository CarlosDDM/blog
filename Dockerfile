FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/public ./public

COPY --from=builder /app/src ./src

COPY --from=builder /app/drizzle.config.js ./

COPY --from=builder /app/next.config.ts ./

COPY --from=builder /app/tsconfig.json ./

COPY --from=builder /app/postcss.config.mjs ./

EXPOSE 3000
