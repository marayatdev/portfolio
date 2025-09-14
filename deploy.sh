#!/bin/bash

# --------- Config ---------
USERNAME="marayat"
SERVER_TAG="v1.0.6"
CLIENT_TAG="v1.0.7"

# --------- Image names ---------
SERVER_IMAGE="$USERNAME/server:$SERVER_TAG"
CLIENT_IMAGE="$USERNAME/client:$CLIENT_TAG"

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
