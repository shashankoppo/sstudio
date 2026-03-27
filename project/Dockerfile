# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy backend source
COPY server ./server

# Copy built assets from build stage
COPY --from=build /app/dist ./dist

# Copy database initialization if needed (or rely on volume/init script)
# For this setup, we'll ensure the data directory exists
RUN mkdir -p server/data

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "server"]
