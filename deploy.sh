#!/bin/bash

# --------- Config ---------
USERNAME="marayat"
TAG="v.1.0.1"

# --------- Image names ---------
SERVER_IMAGE="$USERNAME/server:$TAG"
CLIENT_IMAGE="$USERNAME/client:$TAG"

# --------- Build images ---------
echo "🔨 Building Docker images..."
docker compose build

# --------- Docker login ---------
echo "🔐 Logging into Docker Hub..."
docker login || { echo "❌ Login failed"; exit 1; }

# --------- Push images ---------
echo "🚀 Pushing $SERVER_IMAGE"
docker push $SERVER_IMAGE

echo "🚀 Pushing $CLIENT_IMAGE"
docker push $CLIENT_IMAGE

# --------- Done ---------
echo "✅ All images pushed successfully."
