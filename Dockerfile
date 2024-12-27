# Use Node.js image for building the app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including development dependencies)
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build the TypeScript code
RUN npm run build

# Debug: List the contents of the /app directory
RUN ls -al /app
RUN ls -al /app/dist

# Create the runtime image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Copy any additional files (like firebase.json)
COPY --from=builder /app/firebase.json /app/firebase.json

# Copy the .env file if needed
COPY --from=builder /app/.env /app/.env

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["node", "dist/index.js"]
