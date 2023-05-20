# Fetch the latest node image from Docker Hub
FROM node:20-alpine

# Create a directory to hold the application code inside the image
WORKDIR /app

# Copy the package.json and package-lock.json files to the image
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the image
COPY . .

# Build the application
RUN npm run build --prod

# Expose the port the application is running on
EXPOSE 8080

# Run the application
CMD ["npm", "start"]