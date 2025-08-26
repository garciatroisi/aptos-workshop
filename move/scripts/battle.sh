#!/bin/bash

# Galactic Move Wars - Battle Script
echo "⚔️  Initiating Galactic Battle..."

# Check if all parameters are provided
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
    echo "❌ Usage: ./battle.sh <MODULE_ADDRESS> <OPPONENT_ADDRESS> <YOUR_CHAR_INDEX> <OPPONENT_CHAR_INDEX>"
    echo "   Example: ./battle.sh 0x123... 0x456... 0 1"
    exit 1
fi

MODULE_ADDRESS=$1
OPPONENT_ADDRESS=$2
YOUR_CHAR_INDEX=$3
OPPONENT_CHAR_INDEX=$4

echo "🎯 Battle Details:"
echo "   Your character index: $YOUR_CHAR_INDEX"
echo "   Opponent address: $OPPONENT_ADDRESS"
echo "   Opponent character index: $OPPONENT_CHAR_INDEX"

# Confirm battle
read -p "🤔 Are you ready to battle? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "😴 Battle cancelled. Your warriors will live to fight another day."
    exit 0
fi

echo "🔥 Starting battle..."
aptos move run \
    --function-id $MODULE_ADDRESS::galactic_wars::battle \
    --args address:$OPPONENT_ADDRESS u64:$YOUR_CHAR_INDEX u64:$OPPONENT_CHAR_INDEX \
    --profile galactic-wars

if [ $? -eq 0 ]; then
    echo "✅ Battle completed!"
    echo "🏆 Check the result on the blockchain explorer"
else
    echo "❌ Battle failed. Check your character indices and opponent address."
fi
