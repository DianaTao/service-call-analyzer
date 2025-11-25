#!/bin/bash

# Script to copy generated data files to the web app

echo "📋 Copying data files to web app..."

# Check if files exist
if [ ! -f "../data/transcript.json" ]; then
    echo "❌ Error: transcript.json not found. Run 'npm run transcribe' first."
    exit 1
fi

if [ ! -f "../data/analysis.json" ]; then
    echo "❌ Error: analysis.json not found. Run 'npm run analyze' first."
    exit 1
fi

# Copy files
cp ../data/transcript.json ../web-app/src/data/transcript.json
cp ../data/analysis.json ../web-app/src/data/analysis.json

echo "✅ Data files copied successfully!"
echo ""
echo "Next steps:"
echo "1. cd ../web-app"
echo "2. npm run dev"
echo ""
echo "Then visit http://localhost:5173 to see your analysis!"

