# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

# FROM node:18-alpine

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Clean install dependencies
# RUN npm ci

# # Copy source code
# COPY . .

# # Build TypeScript
# RUN npm run build

# EXPOSE 3000

# # Use serve to run the built application
# RUN npm install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"]


# Use Node 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Install serve globally
RUN npm install -g serve

# Start the application using serve
CMD ["serve", "-s", "build", "-l", "3000"]