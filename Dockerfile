# Use an official Node.js runtime as the base image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install Node.js dependencies
RUN npm install

# Copy the entire React app to the working directory
COPY . .

# Build the React app for production
RUN npm run build

ARG COGNITO_USER_POOL_ID
ENV REACT_APP_COGNITO_USER_POOL_ID=${COGNITO_USER_POOL_ID}

ARG COGNITO_CLIENT_ID
ENV REACT_APP_COGNITO_CLIENT_ID=${COGNITO_CLIENT_ID}

# Expose the port on which the app will run
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
