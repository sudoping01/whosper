# deploy.sh
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Deploying Whosper..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "${RED}Error: Docker is not running${NC}"
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build and start services
echo "🏗️ Building and starting services..."
docker-compose -f docker-compose.prod.yaml up -d --build

# Initialize SSL certificates if needed
if [ ! -d "./certbot/conf/live" ]; then
    echo "🔒 Initializing SSL certificates..."
    docker-compose -f docker-compose.prod.yaml run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d your-domain.com
fi

# Check services health
echo "🏥 Checking services health..."
sleep 10

if docker-compose -f docker-compose.prod.yaml ps | grep -q "Exit"; then
    echo "${RED}Error: Some services failed to start${NC}"
    docker-compose -f docker-compose.prod.yaml logs
    exit 1
fi

echo "${GREEN}✅ Deployment successful!${NC}"

# Display service status
echo "📊 Service Status:"
docker-compose -f docker-compose.prod.yaml ps