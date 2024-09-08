# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Set working directory
WORKDIR /app


# Copy dependencies and build output from the builder stage
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/next.config.mjs /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public



# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
