# Use lightweight version of Node
FROM node:18-bullseye-slim

# Install system dependencies required for native modules (better-sqlite3)
RUN apt-get update && apt-get install -y python3 make g++ sqlite3 && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy package configurations
COPY package*.json ./

# Install dependencies
# Using clean install to ensure exact dependencies without modifying package-lock
RUN npm ci

# Copy full application code (src + server)
COPY . .

# Build the front-end (Vite)
RUN npm run build

# Expose the port from process.env.PORT or default to 5000
EXPOSE 5000

# Set Node environment to production
ENV NODE_ENV=production

# Start the built server application
CMD ["npm", "run", "server"]
