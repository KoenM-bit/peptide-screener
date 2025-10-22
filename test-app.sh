#!/bin/bash

# Script to test the Electron app and help with macOS quarantine issues

echo "🧪 Testing Peptide Analyzer App..."

APP_PATH="./dist_electron/mac-arm64/Peptide Analyzer.app"
DMG_PATH="./dist_electron/Peptide Analyzer-1.1.2-arm64.dmg"

# Check if app exists
if [ ! -d "$APP_PATH" ]; then
    echo "❌ App not found at: $APP_PATH"
    echo "Please run 'npm run electron:build:mac' first"
    exit 1
fi

echo "✅ App found at: $APP_PATH"

# Remove quarantine attribute if present (helps with moved apps)
echo "🔓 Removing quarantine attribute..."
xattr -d com.apple.quarantine "$APP_PATH" 2>/dev/null || echo "No quarantine attribute found"

# Test run the app
echo "🚀 Starting app..."
open "$APP_PATH"

echo ""
echo "📝 If you see the 'Not allowed to load local resource' error:"
echo "1. Make sure you're using the freshly built app"
echo "2. Don't move the app to a different folder without removing quarantine first"
echo "3. Run this command to remove quarantine: xattr -d com.apple.quarantine '$APP_PATH'"
echo ""
echo "📁 To install properly:"
echo "1. Open the DMG: $DMG_PATH"
echo "2. Drag the app to Applications folder"
echo "3. Right-click and 'Open' to allow unsigned app execution"