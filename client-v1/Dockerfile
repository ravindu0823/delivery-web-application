# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code into the container
COPY . .

# Build the app
RUN npm run build

# Expose the port that your app will run on
EXPOSE 4173 

# Define the command to run your app
CMD ["npx", "vite", "preview", "--host"]