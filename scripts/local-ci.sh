#!/bin/bash
# Local CI simulation script

echo "🔍 Running local CI checks..."

echo "📦 Installing dependencies..."
npm ci
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "🔍 Linting code..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Lint failed"
    exit 1
fi

echo "🏗️ Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "🔒 Security audit..."
npm audit --audit-level=high
if [ $? -ne 0 ]; then
    echo "❌ Security issues found"
    exit 1
fi

echo "📊 Checking bundle size..."
BUNDLE_SIZE=$(du -sk dist/ | cut -f1)
echo "Bundle size: ${BUNDLE_SIZE}KB"
if [ $BUNDLE_SIZE -gt 300000 ]; then
    echo "❌ Bundle size exceeds 300MB limit!"
    exit 1
fi

echo "✅ All checks passed! Ready to push 🚀"