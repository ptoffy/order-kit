# Create a docker image for the angular ui
FROM node:20-alpine

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy the rest of the code to the working directory
COPY . .

# Build the application
RUN ng build

# Expose port 4200
EXPOSE 4200

# Run the app
CMD ["npm", "start"]
