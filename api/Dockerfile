# Create a docker image for the api
FROM node:19-alpine

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

RUN npm run build

# Run the app
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "start:prod"]
