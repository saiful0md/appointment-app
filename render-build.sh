#!/bin/bash

# Step 1: Build client
echo "📦 Installing client dependencies..."
cd client
npm install
npm run build

# Step 2: Install server dependencies
echo "🔧 Installing server dependencies..."
cd ../server
npm install
