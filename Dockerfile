
# Use the official Node.js image as the base image
FROM node:18-alpine3.18

# Install pnpm globally
RUN npm install -g npm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install dependencies using pnpm
RUN npm install


# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build


# Expose the port that your Nest.js application will run on
EXPOSE 3000


# Start the Nest.js application
CMD ["npm", "run", "start:prod"]