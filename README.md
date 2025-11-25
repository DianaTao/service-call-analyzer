# 🎯 Service Call Recording Analysis Platform

A production-ready web application for analyzing HVAC service call recordings with dual analysis methodologies: rule-based algorithms and AI-enhanced insights.

**Live Demo:** https://web-app-psi-ashen.vercel.app/

---

## 📋 Table of Contents

- [Overview](#overview)
- [Design Philosophy](#design-philosophy)
- [How This Satisfies Assignment Requirements](#how-this-satisfies-assignment-requirements)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Features](#features)
- [Technologies Used](#technologies-used)

---

## 🎨 Overview

This application analyzes real HVAC service call recordings to evaluate technician performance, compliance with best practices, and identify sales opportunities. It demonstrates both technical proficiency and analytical depth through a dual-methodology approach.

### Live Application Preview

Visit **[web-app-psi-ashen.vercel.app](https://web-app-psi-ashen.vercel.app/)** to see:

- **Overview Tab**: Comprehensive dashboard with key insights and metrics
- **AI vs Rule-Based Tab**: Side-by-side comparison of analysis methodologies  
- **Compliance Tab**: Detailed stage-by-stage evaluation with expandable cards
- **Sales Tab**: Identified opportunities with timestamps and recommendations
- **Transcript Tab**: Full searchable conversation with speaker labels

---

## 🏗️ Design Philosophy

### 1. **Dual Analysis Approach**

The system employs two complementary methodologies:

#### **Rule-Based Algorithm** (Custom JavaScript)
```
Introduction (15%) + Diagnosis (25%) + Solution (25%) + 
Upsell (10%) + Maintenance (10%) + Closing (15%) = Overall Score
```

**Strengths:**
- ⚡ Fast (milliseconds per call)
- 💰 Cost-effective (no API costs)
- 🔄 Consistent and reproducible
- 🔍 Transparent and explainable
- ⚙️ Easy to customize weights

**How it works:**
- Keyword detection for compliance elements
- Question counting for engagement metrics
- Pattern matching for professionalism indicators
- Length analysis for thoroughness
- Weighted scoring across 6 stages

#### **AI-Enhanced Analysis** (GPT-4 Turbo)
```
Contextual understanding + Semantic analysis + 
Tone evaluation + Intent recognition = Nuanced Insights
```

**Strengths:**
- 🧠 Understands context and nuance
- 💬 Recognizes implicit communication
- 🎯 Provides specific examples
- 📊 Detailed actionable recommendations
- 🔄 Adapts to conversation flow

**How it works:**
- Sends transcript to OpenAI GPT-4 Turbo
- Uses carefully crafted prompt with strict scoring criteria
- Parses structured response
- Generates detailed observations and recommendations

### 2. **User-Centered UI Design**

**Information Hierarchy:**
- Executive summary → Key insights → Detailed analysis → Full transcript
- Color-coded scores (Red/Yellow/Green) for instant comprehension
- Expandable cards to prevent information overload
- Timeline visualization showing call progression

**Interaction Design:**
- 5 intuitive tabs for organized navigation
- Search functionality in transcript viewer
- Hover states and smooth transitions
- Mobile-responsive layout

### 3. **Production-Ready Architecture**

```
┌─────────────────┐
│   Audio File    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AssemblyAI API │ ← Transcription with speaker diarization
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌──────────┐
│ Rule-   │ │ AI-      │
│ Based   │ │ Enhanced │
│ Analysis│ │ Analysis │
└────┬────┘ └────┬─────┘
     │           │
     └─────┬─────┘
           ▼
    ┌─────────────┐
    │  React UI   │ ← Beautiful visualization
    └─────────────┘
```

**Scalability Considerations:**
- Stateless analysis functions (easy to parallelize)
- JSON-based data storage (can be replaced with database)
- Modular component architecture
- API-ready design (can be wrapped in REST endpoints)

---

## ✅ How This Satisfies Assignment Requirements

### **Requirement 1: Transcription**

✅ **Delivered:** Full transcript with speaker diarization

**Implementation:**
- Used AssemblyAI API for professional-grade transcription
- Achieved speaker separation (Technician vs Customer)
- Includes timestamps, confidence scores, and utterance IDs
- Result: 82,638-byte transcript with 100+ utterances

**Evidence:** See Transcript tab at https://web-app-psi-ashen.vercel.app/

---

### **Requirement 2: Compliance Analysis**

✅ **Delivered:** All 6 stages evaluated with detailed scoring

**Implementation:**

| Stage | Weight | Evaluation Method | Score | Quality |
|-------|--------|-------------------|-------|---------|
| **Introduction** | 15% | Greeting + Name + Company detection | 40/100 | Poor |
| **Problem Diagnosis** | 25% ⭐ | Question count + Empathy keywords | 60/100 | Fair |
| **Solution Explanation** | 25% ⭐ | Length + Clarity indicators | 40/100 | Poor |
| **Upsell Attempts** | 10% | Recommendation detection | 80/100 | Present |
| **Maintenance Plan** | 10% | Plan mention + Benefits | 0/100 | Missing |
| **Closing** | 15% | Thank you + Professional sign-off | 0/100 | Missing |

**Weighted Overall Score:** 39/100

```
Calculation:
(40×0.15) + (60×0.25) + (40×0.25) + (80×0.10) + (0×0.10) + (0×0.15)
= 6 + 15 + 10 + 8 + 0 + 0 = 39
```

**Insights Provided:**
- Missing elements clearly flagged
- Quality ratings (excellent/good/fair/poor/missing)
- Specific observations with transcript quotes
- Actionable recommendations for improvement

**Evidence:** See Compliance tab with expandable cards for each stage

---

### **Requirement 3: Call Type Identification**

✅ **Delivered:** Correctly identified as "Installation"

**Implementation:**
- Rule-based: Keyword analysis (install, new system, replacement)
- AI-enhanced: "HVAC Equipment Installation/Sales Consultation"
- Both methods agree on call type

**Evidence:** Shown prominently in header and executive summary

---

### **Requirement 4: Sales Insights**

✅ **Delivered:** 5 sales insights identified with timestamps

**Implementation:**

**Opportunities Taken:**
1. ✅ **Upsell Attempt** (25:16) - Financing option mentioned
2. ✅ **Product Line Extension** - Multiple system discussions
3. ✅ **Solution Customization** - Tailored recommendations

**Opportunities Missed:**
1. ⚠️ **No Maintenance Plan** - Could have offered protection plan
2. ⚠️ **Limited Follow-up** - Weak closing and next steps

**Analysis Quality:**
- Specific timestamps for each insight
- Category classification (Upsell, Maintenance, etc.)
- Impact assessment (High/Medium/Low)
- Concrete recommendations with examples

**Evidence:** Sales tab shows all insights with color-coding

---

### **Requirement 5: Clarity of Presentation**

✅ **Delivered:** Professional web application with multiple views

**Design Highlights:**

**Visual Hierarchy:**
- Executive summary with key metrics at top
- Tab navigation for organized content
- Color-coded scores (🔴 <70: Poor, 🟡 70-84: Fair, 🟢 85+: Good)
- Progress bars showing individual stage performance
- Timeline view showing call progression with timestamps

**Ease of Navigation:**
- 5 intuitive tabs with icons and descriptions
- Expandable sections for detailed information
- Search functionality in transcript
- Timeline visualization showing call flow

**Readability:**
- Clean typography (system fonts)
- Adequate spacing and padding
- Responsive design (mobile-friendly)
- Consistent styling throughout

**Evidence:** Explore the live demo at https://web-app-psi-ashen.vercel.app/

---

### **Requirement 6: Use of Resources**

✅ **Delivered:** Smart integration of professional tools

**Resources Used:**

1. **AssemblyAI** ($0.05/min)
   - Industry-leading speech-to-text
   - Speaker diarization
   - High accuracy with technical terminology
   - Chosen for: Specialization in audio processing

2. **OpenAI GPT-4 Turbo** (~$0.20/call)
   - Advanced language understanding
   - Contextual analysis
   - Structured output generation
   - Chosen for: State-of-the-art NLP capabilities

3. **Custom Algorithm** ($0/call)
   - Built from scratch in JavaScript
   - 596 lines of analysis logic
   - Demonstrates technical capability
   - Chosen for: Cost-effective production scaling

**Why This Approach:**
- Leveraged specialized tools (AssemblyAI for audio, not building ASR from scratch)
- Balanced AI power (GPT-4) with practical cost considerations (custom algorithm)
- Demonstrated both integration skills and algorithmic thinking
- Production-ready: Can choose methodology based on use case

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (18.20.8 or higher)
- npm or yarn
- API Keys:
  - AssemblyAI API key (for transcription)
  - OpenAI API key (optional, for AI analysis)

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/DianaTao/service-call-analyzer.git
cd service-call-analyzer

# Set up environment variables
cd scripts
cp .env.example .env
# Edit .env and add your API keys:
# ASSEMBLYAI_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here (optional)

# Install dependencies
npm install

# Navigate to web app
cd ../web-app
npm install
```

### Running the Application

#### Option 1: View Pre-Analyzed Demo (Fastest)

```bash
cd web-app
npm run dev
# Open http://localhost:5173
```

This runs the web app with pre-analyzed data from the real call.

#### Option 2: Analyze Your Own Audio

```bash
cd scripts

# 1. Transcribe an audio file
npm run transcribe
# Follow prompts to upload your audio file

# 2. Run both analyses
npm run analyze-both
# This generates both rule-based and AI analysis

# 3. Copy data to web app
cp data/*.json ../web-app/src/data/

# 4. Run web app
cd ../web-app
npm run dev
```

### Building for Production

```bash
cd web-app
npm run build
# Output in dist/ folder

# Deploy to Vercel
vercel --prod
```

---

## 🏛️ Architecture

### Project Structure

```
service-call-analyzer/
├── scripts/                    # Analysis scripts
│   ├── transcribe.js          # AssemblyAI integration
│   ├── analyze.js             # Rule-based algorithm (596 lines)
│   ├── analyze-ai.js          # AI-enhanced analysis
│   └── package.json           # Script dependencies
│
├── web-app/                   # React application
│   ├── src/
│   │   ├── components/        # 12 React components
│   │   │   ├── Header.tsx
│   │   │   ├── MetricsDashboard.tsx
│   │   │   ├── AnalysisComparison.tsx
│   │   │   ├── ComplianceCard.tsx
│   │   │   ├── SalesInsights.tsx
│   │   │   ├── TranscriptViewer.tsx
│   │   │   ├── KeyInsights.tsx
│   │   │   ├── CallTimeline.tsx
│   │   │   ├── PerformanceMetrics.tsx
│   │   │   └── Footer.tsx
│   │   ├── data/             # JSON data files
│   │   ├── types/            # TypeScript definitions
│   │   ├── App.tsx           # Main application
│   │   └── index.css         # Tailwind styles
│   ├── vercel.json           # Deployment config
│   └── package.json
│
└── data/                     # Generated analysis data
    ├── transcript.json       # 82KB transcription
    ├── analysis.json         # Rule-based results
    └── analysis-ai.json      # AI-enhanced results
```

### Data Flow

```
1. Audio File → AssemblyAI API
   ↓
2. transcript.json (with speaker labels)
   ↓
3. ├─→ analyze.js (Rule-Based)    → analysis.json
   └─→ analyze-ai.js (AI)         → analysis-ai.json
   ↓
4. Web App reads JSON files
   ↓
5. React Components render visualizations
```

### Key Design Decisions

**1. Separation of Concerns**
- Analysis scripts separate from web app
- Can run analyses independently
- Web app is a pure presentation layer

**2. Static Data Approach**
- Pre-analyzed data committed to repo
- Fast load times (no API calls on frontend)
- Easy to demo and share

**3. TypeScript for Type Safety**
- Defined interfaces for all data structures
- Prevents runtime errors
- Better IDE support

**4. Component-Based Architecture**
- 12 reusable React components
- Each with single responsibility
- Easy to test and maintain

---

## ✨ Features

### 🎯 Comprehensive Analysis

- **Dual Methodology**: Rule-based + AI for validation
- **6 Compliance Stages**: Full service call evaluation
- **Sales Intelligence**: Opportunity identification with timestamps
- **Performance Metrics**: Questions asked, talk ratio, response quality

### 📊 Professional UI

- **5 Interactive Tabs**: Organized information architecture
- **Visual Timeline**: See call progression at a glance
- **Expandable Cards**: Dive deep into each stage
- **Search Functionality**: Find specific moments in transcript
- **Responsive Design**: Works on desktop and mobile

### 🔍 Detailed Insights

- **Individual Stage Scores**: Raw performance scores for each compliance stage
- **Weighted Overall Score**: Importance-adjusted final score
- **Transcript Quotes**: See exact evidence for each finding
- **Quality Ratings**: excellent (100) / good (80) / fair (60) / poor (40) / missing (0)
- **Recommendations**: Specific, actionable improvement suggestions
- **Comparison View**: Understand methodology differences between Rule-Based and AI

### ⚡ Production Ready

- **TypeScript**: Type-safe codebase
- **Error Handling**: Graceful fallbacks
- **Fast Performance**: Optimized build (~100KB gzipped)
- **Deployed**: Live on Vercel with CI/CD

---

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool (fast dev server)
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Icon library

### Backend/Analysis
- **Node.js 18** - Runtime environment
- **AssemblyAI API** - Speech-to-text transcription
- **OpenAI GPT-4 Turbo** - AI-enhanced analysis
- **Custom Algorithm** - JavaScript-based analysis

### Deployment & Tools
- **Vercel** - Hosting platform
- **Git/GitHub** - Version control
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 📈 Metrics & Results

### Analysis Results (Real Call)

| Metric | Rule-Based | AI-Enhanced | Notes |
|--------|-----------|-------------|-------|
| **Overall Score** | 39/100 | 83/100 | Different weighting philosophies |
| **Individual Scores** | 40,60,40,80,0,0 | Similar patterns | Both identify same gaps |
| **Call Type** | Installation | Installation | ✅ Perfect match |
| **Sales Insights** | 5 found | 5 found | ✅ Perfect match |
| **Missing Elements** | Maintenance, Closing | Same | ✅ Agreement |
| **Processing Time** | <100ms | 10-20s | Rule: Fast, AI: Detailed |

### Code Quality

- **Total Lines**: ~3,000+
- **TypeScript Coverage**: 100% in web app
- **Components**: 12 reusable
- **Build Size**: 337KB JS, 22KB CSS
- **Gzipped**: 100KB (fast load)

### Understanding the Scoring System

#### **Individual vs Overall Scores**

The application shows two types of scores:

**Individual Stage Scores** (shown in Call Timeline):
```
Introduction:          40/100
Problem Diagnosis:     60/100
Solution Explanation:  40/100
Upsell Attempts:       80/100
Maintenance Plan:       0/100
Closing:                0/100
```

**Weighted Overall Score**: 39/100

#### **How Weighted Scoring Works**

The overall score is NOT a simple average. Instead, it uses weighted importance:

```javascript
Weights:
├─ Introduction:         15%
├─ Problem Diagnosis:    25%  ⭐ Most important
├─ Solution Explanation: 25%  ⭐ Most important
├─ Upsell Attempts:      10%
├─ Maintenance Plan:     10%
└─ Closing:              15%

Calculation:
Overall = (40 × 15%) + (60 × 25%) + (40 × 25%) + (80 × 10%) + (0 × 10%) + (0 × 15%)
        = 6 + 15 + 10 + 8 + 0 + 0
        = 39/100
```

**Why This Design:**
- Diagnosis & Solution are weighted 25% each (core of service call)
- A great upsell (80) doesn't compensate for poor diagnosis
- Missing elements appropriately impact the overall score
- Reflects real-world importance of each stage

#### **Why Rule-Based vs AI Scores Differ**

**Rule-Based (39/100):** Strict keyword matching penalizes missing elements heavily
- Missing company name in intro: Immediate penalty
- No maintenance plan offered: 0 points for that stage  
- Weak closing: 0 points for that stage
- Binary: Either has keyword or doesn't

**AI-Enhanced (83/100):** Contextual understanding rewards good effort
- Recognizes implicit communication
- Credits professional tone and rapport
- Values problem-solving approach
- Understands intent even without exact keywords

**Both methods identify the same issues** - the difference is in how they weigh context vs. strict compliance!

---

## 🎓 Learning & Insights

### Technical Learnings

1. **API Integration**: Successfully integrated two major APIs (AssemblyAI, OpenAI)
2. **Algorithm Design**: Built custom scoring system from scratch
3. **Data Structures**: Designed efficient JSON schemas for analysis data
4. **React Patterns**: Implemented proper component composition
5. **TypeScript**: Used advanced types for type safety

### Analytical Learnings

1. **Service Call Quality**: Most calls have significant improvement opportunities
2. **Common Gaps**: Maintenance plan offerings and closings often missed
3. **Sales Opportunities**: Many implicit chances for upsells
4. **Dual Validation**: Two methods provide confidence in findings
5. **Context Matters**: AI better at recognizing effort, rules better at compliance

### UX Learnings

1. **Progressive Disclosure**: Don't show everything at once
2. **Visual Hierarchy**: Color coding and sizing guide attention
3. **Search is Critical**: Users need to find specific moments
4. **Comparison Views**: Help users understand methodology
5. **Mobile Matters**: Many users on phones

---

## 🚀 Future Enhancements

### If Given More Time

1. **Audio Player Integration**
   - Sync audio playback with transcript
   - Click timestamp to jump to moment
   - Highlight while playing

2. **Batch Processing UI**
   - Upload multiple calls
   - Comparative analytics
   - Trend identification

3. **Custom Training**
   - Fine-tune model on domain data
   - Company-specific compliance rules
   - Industry benchmarks

4. **CRM Integration**
   - Export to Salesforce
   - Auto-create follow-up tasks
   - Performance dashboards

5. **Real-time Analysis**
   - Live call monitoring
   - Instant feedback to technicians
   - Supervisor alerts



**Developer:** Diana Tao  
**Repository:** https://github.com/DianaTao/service-call-analyzer  
**Live Demo:** https://web-app-psi-ashen.vercel.app/


