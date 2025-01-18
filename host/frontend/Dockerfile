FROM node:18-alpine

WORKDIR /app

# Install dependencies with legacy peer deps
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy application
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]