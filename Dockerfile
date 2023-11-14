# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Remove the node_modules folder if it exists
RUN rm -rf node_modules

# Remove the package-lock.json file if it exists
RUN rm -f package-lock.json

# Install Node.js dependencies
RUN npm install

# Copy the entire React app to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
