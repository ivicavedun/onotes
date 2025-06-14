#!/bin/bash

# Setup script for Auto Timestamp Notes Obsidian Plugin

echo "Setting up Auto Timestamp Notes plugin..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the plugin
echo "Building plugin..."
npm run build

# Check if main.js was created
if [ -f "main.js" ]; then
    echo "✅ Build successful! Plugin is ready."
    echo ""
    echo "Next steps:"
    echo "1. Copy this folder to your vault's .obsidian/plugins/ directory"
    echo "2. Reload Obsidian (Ctrl/Cmd + R)"
    echo "3. Enable 'Auto Timestamp Notes' in Settings → Community plugins"
else
    echo "❌ Build failed. Please check for errors above."
fi