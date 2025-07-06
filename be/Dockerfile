# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally (optional if it's a devDependency)
RUN npm install -g nodemon

# Copy the rest of your backend code
COPY . .

# Expose the port your backend runs on
EXPOSE 3001

# Start the dev server using nodemon
CMD ["npm", "run", "dev"]
