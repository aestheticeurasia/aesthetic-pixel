# Install dependencies only when needed
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies based on the lock file
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    else echo "No lock file found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build (adjust as needed)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the app
RUN npm run build

# Production image, copy necessary files
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Optional: Enable standalone output for smaller image
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]