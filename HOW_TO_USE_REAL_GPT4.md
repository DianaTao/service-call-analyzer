# 🤖 How to Use Real GPT-4 API (Instead of Mock)

Currently, the app uses **mock AI analysis** to demonstrate the dual-analysis feature without requiring API costs. Here's how to enable real GPT-4 Turbo API calls.

---

## 🔑 Quick Setup (2 minutes)

### Option 1: Use the Setup Script

```bash
cd service-call-analyzer/scripts
./setup-openai.sh
```

The script will:
1. ✅ Prompt you for your OpenAI API key
2. ✅ Add it to your `.env` file
3. ✅ Show you the next steps

### Option 2: Manual Setup

```bash
cd service-call-analyzer/scripts

# Edit .env file and add your key
nano .env
```

Add this line to `.env`:
```bash
OPENAI_API_KEY=sk-your-actual-openai-key-here
```

---

## 📡 Running Real AI Analysis

```bash
cd service-call-analyzer/scripts

# This will now make a REAL API call to GPT-4
npm run analyze-ai
```

**What happens:**
- 🌐 Sends transcript to OpenAI API
- 🤖 GPT-4 Turbo analyzes the conversation
- ⏱️  Takes 10-30 seconds (vs instant mock)
- 💰 Costs ~$0.10-0.30 per call
- 📊 Generates `data/analysis-ai.json` with REAL insights

---

## 🔄 Update Web App with Real Analysis

```bash
# Copy real AI analysis to web app
cp data/analysis-ai.json web-app/src/data/

# Rebuild web app
cd web-app
npm run build

# Deploy to Vercel (optional)
vercel --prod
```

---

## 💡 Key Differences: Mock vs Real

| Feature | Mock (Current) | Real GPT-4 |
|---------|---------------|------------|
| **Cost** | $0 | ~$0.10-0.30/call |
| **Speed** | Instant | 10-30 seconds |
| **Quality** | Template-based | True AI insights |
| **Customization** | Fixed responses | Contextual understanding |
| **Nuance** | Basic | Catches subtle patterns |
| **Examples** | Generic | Specific to your call |

---

## 🎯 What Real GPT-4 Analysis Provides

**Better Insights:**
- ✅ Contextual understanding of conversation flow
- ✅ Tone and sentiment analysis
- ✅ Customer reaction interpretation
- ✅ Specific quote references from the call
- ✅ Nuanced quality assessments
- ✅ More actionable recommendations

**Example Real Output:**
```json
{
  "compliance": {
    "introduction": {
      "score": 85,
      "quality": "good",
      "observations": "Technician Landon introduced himself by name but didn't clearly state the company name. However, the professional tone set a positive foundation.",
      "recommendations": "Include company name in greeting: 'Hi, I'm Landon with [Company]. Thanks for choosing us today.'"
    }
  }
}
```

vs **Mock Output:**
```json
{
  "compliance": {
    "introduction": {
      "score": 88,
      "quality": "good",
      "observations": "Generic observation about introduction quality",
      "recommendations": "Standard recommendation"
    }
  }
}
```

---

## 🔐 Getting Your OpenAI API Key

1. **Visit:** https://platform.openai.com/api-keys
2. **Sign up** or log in (credit card required for paid tier)
3. **Create new key:** Click "Create new secret key"
4. **Copy key:** Starts with `sk-...`
5. **Add $10-20 credit:** Settings → Billing → Add payment method

**Pricing:** 
- GPT-4 Turbo: ~$0.01 per 1K input tokens, $0.03 per 1K output tokens
- Average call analysis: ~3K input + 2K output = ~$0.10-0.30

---

## 🧪 Test Both Versions

You can compare mock vs real by running both:

```bash
# Generate mock version
OPENAI_API_KEY="" npm run analyze-ai
cp ../data/analysis-ai.json ../data/analysis-ai-mock.json

# Generate real version (requires API key in .env)
npm run analyze-ai
cp ../data/analysis-ai.json ../data/analysis-ai-real.json

# Compare them
diff analysis-ai-mock.json analysis-ai-real.json
```

---

## ⚠️ Important Notes

**For Demo/Interview:**
- The **mock version is perfectly fine** for showcasing the dual-analysis concept
- Interviewers will understand you're demonstrating the architecture, not spending money on every demo
- The mock is clearly labeled in the code and demonstrates understanding of API integration

**For Production:**
- Use real API for actual business use cases
- The 94.3% correlation metric is based on the mock (would likely be different with real GPT-4)
- Real GPT-4 typically gives higher scores and more detailed insights

**Cost Management:**
- Set up usage limits in OpenAI dashboard
- Real API call is only made when `analyze-ai.js` runs
- The web app itself never makes API calls (static data)

---

## 🎓 For Interview Discussion

**If Asked:** "Why use mock instead of real API?"

**Good Answer:**
> "I implemented mock AI analysis for the demo to showcase the dual-analysis architecture without ongoing API costs. The code is production-ready—I have full GPT-4 integration with proper error handling. The mock demonstrates I understand both approaches: rule-based for cost-effective scale, and AI-enhanced for contextual depth. In production, I'd use real API calls and potentially cache results to balance quality with cost efficiency."

**Show Them:**
1. Point to the real API code (lines 69-90 in `analyze-ai.js`)
2. Show the environment variable check (line 28)
3. Explain the fallback strategy (lines 104-108)

---

## 🚀 Ready to Try?

```bash
# Navigate to scripts directory
cd service-call-analyzer/scripts

# Run the setup helper
./setup-openai.sh

# Then analyze with real GPT-4
npm run analyze-ai
```

That's it! Your dashboard will now show **real AI-powered insights**. 🎉

