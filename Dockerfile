# Dockerfile
# 1. Use the official Node.js image as a base
FROM node:18-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Copy the package files and install dependencies
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# 4. Copy the application source code
COPY . .

# 5. Build the Next.js app for production
RUN npm run build

# 6. Expose port 3000
EXPOSE 3000

# 7. Run the app in production mode
CMD ["npm", "run", "start"]
