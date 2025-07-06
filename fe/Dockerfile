# ureg-fe/Dockerfile

FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (default Next.js port)
EXPOSE 3000

# Start Next.js (dev)
CMD ["npm", "run", "dev"]
