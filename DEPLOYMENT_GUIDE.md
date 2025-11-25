# 🚀 Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

\`\`\`bash
# Install GitHub CLI if you haven't
# macOS: brew install gh
# Then authenticate
gh auth login

# Create repo and push (run from project root)
cd /Users/yifeitao/Downloads/Takehome/service-call-analyzer
gh repo create service-call-analyzer --public --source=. --remote=origin --push
\`\`\`

### Option B: Using GitHub Website

1. Go to https://github.com/new
2. Repository name: **service-call-analyzer**
3. Description: "Service call analysis application with AI-powered transcription and compliance evaluation"
4. Choose **Public**
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

7. Then push your code:
\`\`\`bash
cd /Users/yifeitao/Downloads/Takehome/service-call-analyzer
git remote add origin https://github.com/YOUR_USERNAME/service-call-analyzer.git
git branch -M main
git push -u origin main
\`\`\`

---

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Quick)

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (run from project root)
cd /Users/yifeitao/Downloads/Takehome/service-call-analyzer
vercel --prod

# When prompted:
# - Link to existing project? No
# - What's your project's name? service-call-analyzer
# - In which directory is your code located? ./web-app
# - Vercel will auto-detect Vite settings
\`\`\`

### Option B: Using Vercel Dashboard (Recommended for first deploy)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository: **service-call-analyzer**
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: web-app
   - **Build Command**: npm run build (auto-detected)
   - **Output Directory**: dist (auto-detected)
5. Click "Deploy"

✅ Your app will be live in ~2 minutes!

---

## Step 3: Update README with Live URL

After deployment, Vercel will give you a URL like:
- `https://service-call-analyzer.vercel.app`

Update your README.md:

\`\`\`bash
cd /Users/yifeitao/Downloads/Takehome/service-call-analyzer

# Edit README.md and replace:
# [Add your deployed URL here after Vercel deployment]
# with your actual URL

git add README.md
git commit -m "Add live demo URL"
git push
\`\`\`

---

## 🎉 You're Done!

Your application is now:
✅ Hosted on GitHub
✅ Deployed on Vercel
✅ Accessible via public URL

## 📊 What's Deployed

- React + TypeScript web application
- Real analysis data from the transcribed call
- Interactive dashboard with compliance scoring
- Sales insights and recommendations
- Full searchable transcript

## 🔄 Future Updates

To update your deployed app:

\`\`\`bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push

# Vercel will automatically redeploy! 🎉
\`\`\`

---

## 🛠️ Troubleshooting

**Build fails on Vercel?**
- Make sure Root Directory is set to `web-app`
- Check that all dependencies are in package.json
- Review build logs in Vercel dashboard

**App shows placeholder data?**
- The real data is already copied to `web-app/src/data/`
- Check that `transcript.json` and `analysis.json` exist
- They were copied in the git commit

**Need to update analysis?**
- Run `npm run analyze` in scripts directory
- Copy new files: `./copy-data.sh`
- Commit and push changes

---

## 📝 Quick Commands Summary

\`\`\`bash
# Create GitHub repo and push
gh repo create service-call-analyzer --public --source=. --push

# Deploy to Vercel
vercel --prod
\`\`\`

That's it! 🚀

