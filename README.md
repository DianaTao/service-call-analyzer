# Service Call Recording Analysis

A web application for analyzing service call recordings, evaluating technician performance, and identifying sales opportunities.

## 🌐 Live Demo

[Add your deployed URL here after Vercel deployment]

## 📋 Overview

This application transcribes and analyzes service call recordings to:
- Evaluate compliance with standard service call procedures (6 key stages)
- Identify sales opportunities (taken and missed)
- Provide actionable insights for performance improvement
- Display interactive transcript with speaker identification

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Transcription**: AssemblyAI API
- **Analysis**: Node.js with custom scoring algorithm
- **Hosting**: Vercel

## 🚀 Features

- 📝 Complete call transcription with speaker diarization
- ✅ Compliance analysis across 6 stages (weighted scoring 0-100)
- 💡 Sales opportunity detection and recommendations
- 📊 Interactive dashboard with metrics
- 🔍 Searchable transcript viewer
- 📱 Fully responsive design

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm
- AssemblyAI API key (free $50 credit at https://www.assemblyai.com)

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/service-call-analyzer.git
cd service-call-analyzer
\`\`\`

2. Install dependencies for scripts
\`\`\`bash
cd scripts
npm install
\`\`\`

3. Install dependencies for web app
\`\`\`bash
cd ../web-app
npm install
\`\`\`

### Usage

#### Generate Analysis (Optional - Real Data)

If you want to analyze your own audio:

\`\`\`bash
cd scripts

# Add your AssemblyAI API key
echo "ASSEMBLYAI_API_KEY=your_key_here" > .env

# Transcribe audio
npm run transcribe

# Analyze transcript
npm run analyze

# Copy to web app
./copy-data.sh
\`\`\`

#### Run Web Application

\`\`\`bash
cd web-app
npm run dev
\`\`\`

Visit http://localhost:5173

## 📁 Project Structure

\`\`\`
service-call-analyzer/
├── scripts/              # Backend processing
│   ├── transcribe.js    # AssemblyAI integration
│   ├── analyze.js       # Analysis algorithm
│   └── package.json
├── data/                 # Generated data
│   ├── audio/           # Audio files
│   ├── transcript.json
│   └── analysis.json
├── web-app/             # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── data/        # Analysis data (JSON)
│   │   └── types/       # TypeScript definitions
│   └── package.json
└── README.md
\`\`\`

## 🎯 Analysis Methodology

### Compliance Stages (Weighted)
1. **Introduction** (15%) - Greeting and identification
2. **Problem Diagnosis** (25%) - Understanding the issue
3. **Solution Explanation** (25%) - Clear communication
4. **Upsell Attempts** (10%) - Additional services
5. **Maintenance Plan** (10%) - Long-term agreements
6. **Closing** (15%) - Professional ending

### Quality Ratings
- Excellent: 90-100
- Good: 75-89
- Fair: 60-74
- Poor: 40-59
- Missing: 0

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Visit https://vercel.com
3. Import your repository
4. Vercel will auto-detect Vite and configure:
   - Root Directory: `web-app`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy!

### Environment Variables (Optional)

If you want to transcribe audio in production, add to Vercel:
- `ASSEMBLYAI_API_KEY`: Your AssemblyAI API key

## 📄 License

MIT

## 👤 Author

Your Name

## 🙏 Acknowledgments

- AssemblyAI for transcription services
- React Icons for UI icons
- Tailwind CSS for styling
