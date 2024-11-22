# Use Node.js image to build the React app
FROM node:16.14.2

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app for production
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Serve the production build using a simple HTTP server
CMD ["npx", "serve", "-s", "build", "-l", "3000"]


