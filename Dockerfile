# ---- Build Stage ----
FROM node:16.14 AS builder 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the docusaurus app
RUN npm run build

# ---- Run Stage ----
FROM node:16.14-slim

# Set working directory
WORKDIR /app

# Install 'serve' to run our application
RUN npm install -g serve

# Copy built app from the previous stage
COPY --from=builder /app/build ./build

# Start the application using 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose port 3000
EXPOSE 3000
