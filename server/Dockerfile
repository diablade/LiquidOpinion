FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies only layer
FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev

# Build layer
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Production image
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

USER appuser

EXPOSE 3000
CMD ["node", "dist/app.js"]
