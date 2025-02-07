# Use a Node image for the backend
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Expose port (make sure this matches your server's port)
EXPOSE 5352

# Start the backend server
CMD ["node", "index.js"]