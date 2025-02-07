# Use a Node image to build the frontend
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# install global dependencies
RUN npm install -g axios
RUN npm install -g react

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the static files
FROM nginx:alpine

# Copy the build output to the Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
