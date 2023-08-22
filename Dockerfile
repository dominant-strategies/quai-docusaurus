# ---- Build Stage ----
FROM node:16.14 AS builder 

# Set working directory
WORKDIR /app

# In the builder stage
ENV NODE_ENV=production

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

# Copy built app and required files/directories from the previous stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/docusaurus.config.js ./docusaurus.config.js
COPY --from=builder /app/sidebars.js ./sidebars.js
COPY --from=builder /app/node_modules ./node_modules


# Start the application using 'serve'
CMD ["npm", "run", "serve"]

# Expose port 3000
EXPOSE 3000

