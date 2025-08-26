#!/bin/bash

# Galactic Move Wars - Deploy Script
echo "🚀 Deploying Galactic Move Wars to Aptos Testnet..."

# Check if Aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "❌ Aptos CLI not found. Please install it first:"
    echo "   curl -fsSL \"https://aptos.dev/scripts/install_cli.py\" | python3"
    exit 1
fi

# Initialize if not already done
if [ ! -f ".aptos/config.yaml" ]; then
    echo "📝 Initializing Aptos configuration..."
    aptos init --profile galactic-wars --network testnet
fi

# Compile and publish
echo "🔨 Compiling Move modules..."
aptos move compile --named-addresses galactic_wars=default

if [ $? -eq 0 ]; then
    echo "📦 Publishing to testnet..."
    aptos move publish --named-addresses galactic_wars=default --profile galactic-wars
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully deployed Galactic Move Wars!"
        echo "🌐 View on Explorer: https://explorer.aptoslabs.com/account/$(aptos account list --profile galactic-wars | grep default | awk '{print $2}')?network=testnet"
    else
        echo "❌ Failed to publish module"
        exit 1
    fi
else
    echo "❌ Compilation failed"
    exit 1
fi
