# Use an official Node.js runtime as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies in the container
RUN yarn install --frozen-lockfile

# Copy the rest of the application to the container
COPY . .

# Build the static site
RUN yarn build

# Use an Nginx image to serve the built static site
FROM nginx:alpine

# Copy the built static site from the build stage to the nginx html directory
COPY --from=0 /app/build/ /usr/share/nginx/html/docs

# Copy custom nginx configuration to set up routes
COPY ./nginx-custom-config.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx with global directives and daemon off so it stays in the foreground
CMD ["nginx", "-g", "daemon off;"]
