# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
