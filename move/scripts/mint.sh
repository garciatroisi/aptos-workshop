#!/bin/bash

# Galactic Move Wars - Mint Characters Script
echo "🎭 Minting Galactic Warriors..."

# Check if module address is provided
if [ -z "$1" ]; then
    echo "❌ Usage: ./mint.sh <MODULE_ADDRESS>"
    echo "   Example: ./mint.sh 0x123..."
    exit 1
fi

MODULE_ADDRESS=$1

# Character types
ALIEN=1
ASTRONAUT=2
ROBOT=3

# Initialize the module first
echo "🔧 Initializing Galactic Wars module..."
aptos move run --function-id $MODULE_ADDRESS::galactic_wars::initialize --profile galactic-wars

# Create collection
echo "📚 Creating NFT collection..."
aptos move run --function-id $MODULE_ADDRESS::galactic_wars::create_collection --profile galactic-wars

# Mint Alien
echo "👽 Minting Alien character..."
aptos move run \
    --function-id $MODULE_ADDRESS::galactic_wars::mint_character \
    --args u64:$ALIEN \
    string:"Cosmic Alien" \
    string:"A mysterious alien from the depths of space" \
    string:"https://galactic-wars.com/alien.png" \
    --profile galactic-wars

# Mint Astronaut
echo "👨‍🚀 Minting Astronaut character..."
aptos move run \
    --function-id $MODULE_ADDRESS::galactic_wars::mint_character \
    --args u64:$ASTRONAUT \
    string:"Space Explorer" \
    string:"A brave astronaut ready for intergalactic battles" \
    string:"https://galactic-wars.com/astronaut.png" \
    --profile galactic-wars

# Mint Robot
echo "🤖 Minting Robot character..."
aptos move run \
    --function-id $MODULE_ADDRESS::galactic_wars::mint_character \
    --args u64:$ROBOT \
    string:"Battle Bot" \
    string:"A mechanical warrior with advanced combat systems" \
    string:"https://galactic-wars.com/robot.png" \
    --profile galactic-wars

echo "✅ All characters minted successfully!"
echo "🎮 Your warriors are ready for battle!"
