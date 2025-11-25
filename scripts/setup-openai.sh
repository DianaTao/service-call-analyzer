#!/bin/bash

echo "🔑 OpenAI API Setup"
echo "===================="
echo ""
echo "This script will help you set up real GPT-4 API calls."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    touch .env
fi

# Check if OPENAI_API_KEY already exists
if grep -q "OPENAI_API_KEY" .env; then
    echo "⚠️  OPENAI_API_KEY already exists in .env"
    echo ""
    read -p "Do you want to replace it? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Keeping existing key."
        exit 0
    fi
    # Remove old key
    sed -i '' '/OPENAI_API_KEY/d' .env
fi

echo ""
echo "📝 Enter your OpenAI API key (or press Ctrl+C to cancel):"
echo "   Get one at: https://platform.openai.com/api-keys"
echo ""
read -p "API Key (starts with sk-): " api_key

if [[ ! $api_key == sk-* ]]; then
    echo "❌ Error: API key should start with 'sk-'"
    exit 1
fi

# Add to .env
echo "OPENAI_API_KEY=$api_key" >> .env

echo ""
echo "✅ API key added to .env file!"
echo ""
echo "📊 Next steps:"
echo "   1. Run: npm run analyze-ai"
echo "   2. Wait 10-30 seconds for GPT-4 analysis"
echo "   3. Copy results: cp ../data/analysis-ai.json ../web-app/src/data/"
echo "   4. Build: cd ../web-app && npm run build"
echo "   5. Deploy: vercel --prod"
echo ""
echo "💰 Cost: ~\$0.10-0.30 per call"
echo "🤖 Model: GPT-4 Turbo"
echo ""

