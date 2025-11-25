import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSCRIPT_FILE = path.join(__dirname, '../data/transcript.json');
const OUTPUT_FILE = path.join(__dirname, '../data/analysis.json');

// Load transcript
let transcript;
try {
  transcript = JSON.parse(fs.readFileSync(TRANSCRIPT_FILE, 'utf8'));
} catch (error) {
  console.error('❌ Error: Could not read transcript.json');
  console.error('Please run "npm run transcribe" first to generate the transcript.');
  process.exit(1);
}

// Keywords for stage detection
const STAGE_KEYWORDS = {
  introduction: ['hello', 'hi', 'this is', 'my name', 'calling from', 'speaking'],
  diagnosis: ['problem', 'issue', 'wrong', 'happening', 'not working', 'broken', 'tell me'],
  solution: ['fix', 'repair', 'replace', 'install', 'solution', 'what i did', "what we'll do"],
  upsell: ['also', 'recommend', 'might want', 'consider', 'upgrade', 'additional'],
  maintenance: ['maintenance', 'plan', 'service agreement', 'subscription', 'yearly', 'annual'],
  closing: ['thank', 'thanks', 'appreciate', 'have a', 'take care', 'goodbye', 'bye'],
};

function analyzeCallStages() {
  const utterances = transcript.utterances;
  const stages = {
    introduction: null,
    problemDiagnosis: null,
    solutionExplanation: null,
    upsellAttempts: [],
    maintenancePlanOffer: null,
    closing: null,
  };
  
  // Find introduction (usually first few utterances from technician)
  const introUtterance = utterances.find((u, i) => 
    i < 5 && u.speakerLabel === 'Technician' && 
    STAGE_KEYWORDS.introduction.some(kw => u.text.toLowerCase().includes(kw))
  );
  
  if (introUtterance) {
    stages.introduction = {
      present: true,
      timestamp: introUtterance.startTime,
      utteranceId: introUtterance.id,
      transcript: introUtterance.text,
      quality: evaluateIntroduction(introUtterance.text),
    };
  } else {
    stages.introduction = {
      present: false,
      quality: 'missing',
    };
  }
  
  // Find problem diagnosis
  const diagnosisUtterances = utterances.filter(u =>
    STAGE_KEYWORDS.diagnosis.some(kw => u.text.toLowerCase().includes(kw))
  );
  
  if (diagnosisUtterances.length > 0) {
    const mainDiagnosis = diagnosisUtterances[0];
    stages.problemDiagnosis = {
      present: true,
      timestamp: mainDiagnosis.startTime,
      utteranceIds: diagnosisUtterances.map(u => u.id),
      transcript: diagnosisUtterances.map(u => `[${u.speakerLabel}] ${u.text}`).join('\n'),
      quality: evaluateDiagnosis(diagnosisUtterances),
      questionCount: diagnosisUtterances.filter(u => u.text.includes('?')).length,
    };
  } else {
    stages.problemDiagnosis = {
      present: false,
      quality: 'missing',
    };
  }
  
  // Find solution explanation
  const solutionUtterances = utterances.filter(u =>
    u.speakerLabel === 'Technician' &&
    STAGE_KEYWORDS.solution.some(kw => u.text.toLowerCase().includes(kw))
  );
  
  if (solutionUtterances.length > 0) {
    stages.solutionExplanation = {
      present: true,
      timestamp: solutionUtterances[0].startTime,
      utteranceIds: solutionUtterances.map(u => u.id),
      transcript: solutionUtterances.map(u => u.text).join(' '),
      quality: evaluateSolution(solutionUtterances),
    };
  } else {
    stages.solutionExplanation = {
      present: false,
      quality: 'missing',
    };
  }
  
  // Find upsell attempts
  utterances.forEach(u => {
    if (u.speakerLabel === 'Technician' &&
        STAGE_KEYWORDS.upsell.some(kw => u.text.toLowerCase().includes(kw))) {
      stages.upsellAttempts.push({
        timestamp: u.startTime,
        utteranceId: u.id,
        transcript: u.text,
      });
    }
  });
  
  // Find maintenance plan offer
  const maintenanceUtterance = utterances.find(u =>
    u.speakerLabel === 'Technician' &&
    STAGE_KEYWORDS.maintenance.some(kw => u.text.toLowerCase().includes(kw))
  );
  
  if (maintenanceUtterance) {
    stages.maintenancePlanOffer = {
      present: true,
      timestamp: maintenanceUtterance.startTime,
      utteranceId: maintenanceUtterance.id,
      transcript: maintenanceUtterance.text,
      quality: evaluateMaintenancePlan(maintenanceUtterance.text),
    };
  } else {
    stages.maintenancePlanOffer = {
      present: false,
      quality: 'missing',
    };
  }
  
  // Find closing
  const closingUtterances = utterances.slice(-5).filter(u =>
    u.speakerLabel === 'Technician' &&
    STAGE_KEYWORDS.closing.some(kw => u.text.toLowerCase().includes(kw))
  );
  
  if (closingUtterances.length > 0) {
    stages.closing = {
      present: true,
      timestamp: closingUtterances[0].startTime,
      utteranceIds: closingUtterances.map(u => u.id),
      transcript: closingUtterances.map(u => u.text).join(' '),
      quality: evaluateClosing(closingUtterances),
    };
  } else {
    stages.closing = {
      present: false,
      quality: 'missing',
    };
  }
  
  return stages;
}

function evaluateIntroduction(text) {
  const lowerText = text.toLowerCase();
  let score = 0;
  
  // Check for key elements
  if (lowerText.includes('hello') || lowerText.includes('hi')) score += 20;
  if (lowerText.match(/my name is|this is|i'm|i am/)) score += 30;
  if (lowerText.match(/company|service|hvac|plumbing|electric/)) score += 30;
  if (text.length > 20) score += 20; // Adequate length
  
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 45) return 'fair';
  return 'poor';
}

function evaluateDiagnosis(utterances) {
  const techUtterances = utterances.filter(u => u.speakerLabel === 'Technician');
  const questions = utterances.filter(u => u.text.includes('?'));
  
  let score = 0;
  
  if (questions.length >= 3) score += 40;
  else if (questions.length >= 2) score += 25;
  else if (questions.length >= 1) score += 15;
  
  if (techUtterances.length >= 3) score += 30;
  else if (techUtterances.length >= 2) score += 20;
  
  // Check for empathy keywords
  const empathyWords = ['understand', 'see', 'sorry', 'concern'];
  if (utterances.some(u => empathyWords.some(w => u.text.toLowerCase().includes(w)))) {
    score += 30;
  }
  
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 45) return 'fair';
  return 'poor';
}

function evaluateSolution(utterances) {
  const totalLength = utterances.reduce((sum, u) => sum + u.text.length, 0);
  
  let score = 0;
  
  if (totalLength > 200) score += 40; // Detailed explanation
  else if (totalLength > 100) score += 25;
  else if (totalLength > 50) score += 15;
  
  // Check for explanation keywords
  const explainWords = ['because', 'reason', 'so', 'this will', 'helps'];
  if (utterances.some(u => explainWords.some(w => u.text.toLowerCase().includes(w)))) {
    score += 30;
  }
  
  // Check if they confirmed understanding
  if (utterances.some(u => u.text.toLowerCase().match(/make sense|understand|clear|questions/))) {
    score += 30;
  }
  
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 45) return 'fair';
  return 'poor';
}

function evaluateMaintenancePlan(text) {
  let score = 0;
  
  const lowerText = text.toLowerCase();
  
  if (lowerText.match(/\$|cost|price|dollar/)) score += 30; // Mentioned pricing
  if (lowerText.match(/benefit|save|protect|prevent/)) score += 30; // Explained benefits
  if (text.length > 50) score += 40; // Detailed explanation
  
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 45) return 'fair';
  return 'poor';
}

function evaluateClosing(utterances) {
  let score = 0;
  
  const combinedText = utterances.map(u => u.text.toLowerCase()).join(' ');
  
  if (combinedText.match(/thank|thanks/)) score += 40;
  if (combinedText.match(/appreciate|pleasure/)) score += 20;
  if (combinedText.match(/call|contact|reach|number/)) score += 20; // Provided contact info
  if (combinedText.match(/questions|concerns|anything else/)) score += 20;
  
  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 45) return 'fair';
  return 'poor';
}

function identifySalesInsights(stages) {
  const insights = [];
  
  // Check if upsell was attempted
  if (stages.upsellAttempts.length > 0) {
    insights.push({
      type: 'opportunity_taken',
      timestamp: stages.upsellAttempts[0].timestamp,
      category: 'Upsell',
      description: 'Technician made upsell attempt during the call',
      transcript: stages.upsellAttempts[0].transcript,
      recommendation: 'Good job identifying opportunity for additional services',
    });
  } else {
    insights.push({
      type: 'opportunity_missed',
      timestamp: 'N/A',
      category: 'Upsell',
      description: 'No upsell attempts detected',
      recommendation: 'Consider suggesting relevant additional services based on the problem',
    });
  }
  
  // Check maintenance plan
  if (stages.maintenancePlanOffer.present) {
    insights.push({
      type: 'opportunity_taken',
      timestamp: stages.maintenancePlanOffer.timestamp,
      category: 'Maintenance Plan',
      description: 'Technician offered maintenance plan',
      transcript: stages.maintenancePlanOffer.transcript,
      recommendation: stages.maintenancePlanOffer.quality === 'excellent' 
        ? 'Excellent job explaining benefits'
        : 'Could provide more detail about plan benefits and pricing',
    });
  } else {
    insights.push({
      type: 'opportunity_missed',
      timestamp: 'N/A',
      category: 'Maintenance Plan',
      description: 'No maintenance plan offered',
      recommendation: 'Always offer maintenance plans to prevent future issues and build recurring revenue',
    });
  }
  
  return insights;
}

function determineCallType() {
  const fullText = transcript.fullText.toLowerCase();
  
  // Check for keywords
  const keywords = {
    'Emergency Repair': ['emergency', 'urgent', 'immediately', 'asap', 'broken', 'not working'],
    'Routine Maintenance': ['maintenance', 'check-up', 'inspection', 'scheduled', 'routine'],
    'Installation': ['install', 'installation', 'new', 'installing'],
    'Repair': ['repair', 'fix', 'broken', 'replace'],
    'Consultation': ['estimate', 'quote', 'consultation', 'advice'],
  };
  
  let maxScore = 0;
  let callType = 'General Service Call';
  
  for (const [type, words] of Object.entries(keywords)) {
    const score = words.filter(word => fullText.includes(word)).length;
    if (score > maxScore) {
      maxScore = score;
      callType = type;
    }
  }
  
  return callType;
}

function calculateComplianceScores(stages) {
  const weights = {
    introduction: 0.15,
    problemDiagnosis: 0.25,
    solutionExplanation: 0.25,
    upsellAttempts: 0.10,
    maintenancePlanOffer: 0.10,
    closing: 0.15,
  };
  
  const qualityScores = {
    excellent: 100,
    good: 80,
    fair: 60,
    poor: 40,
    missing: 0,
  };
  
  const scores = {};
  let totalWeightedScore = 0;
  
  // Calculate individual scores
  scores.introduction = qualityScores[stages.introduction.quality];
  scores.problemDiagnosis = qualityScores[stages.problemDiagnosis.quality];
  scores.solutionExplanation = qualityScores[stages.solutionExplanation.quality];
  scores.upsellAttempts = stages.upsellAttempts.length > 0 ? 80 : 0;
  scores.maintenancePlanOffer = qualityScores[stages.maintenancePlanOffer.quality];
  scores.closing = qualityScores[stages.closing.quality];
  
  // Calculate weighted overall score
  for (const [stage, weight] of Object.entries(weights)) {
    totalWeightedScore += scores[stage] * weight;
  }
  
  return {
    individual: scores,
    overall: Math.round(totalWeightedScore),
  };
}

function generateCommentary(stage, data) {
  const qualityDescriptions = {
    excellent: '✅ Excellent execution',
    good: '✓ Good execution with minor room for improvement',
    fair: '⚠️ Fair execution with significant room for improvement',
    poor: '⚠️ Poor execution, needs improvement',
    missing: '❌ Missing or not completed',
  };
  
  let commentary = qualityDescriptions[data.quality];
  
  // Add specific commentary based on stage
  switch (stage) {
    case 'introduction':
      if (data.present) {
        commentary += '. The technician properly greeted the customer and introduced themselves.';
      } else {
        commentary += '. The call should begin with a proper greeting and introduction.';
      }
      break;
      
    case 'problemDiagnosis':
      if (data.present) {
        commentary += `. The technician asked ${data.questionCount || 0} questions to understand the problem.`;
        if (data.questionCount >= 3) {
          commentary += ' Good active listening and information gathering.';
        }
      } else {
        commentary += '. The technician should ask probing questions to fully understand the issue.';
      }
      break;
      
    case 'solutionExplanation':
      if (data.present) {
        commentary += '. The technician explained what work was done or will be done.';
      } else {
        commentary += '. The technician should clearly explain the solution to build customer confidence.';
      }
      break;
      
    case 'upsellAttempts':
      if (data.length > 0) {
        commentary = `✓ The technician made ${data.length} upsell attempt(s). Good job identifying opportunities.`;
      } else {
        commentary = '⚠️ No upsell attempts detected. Consider suggesting relevant additional services.';
      }
      break;
      
    case 'maintenancePlanOffer':
      if (data.present) {
        commentary += '. Offering maintenance plans helps build recurring revenue.';
      } else {
        commentary += '. Always offer maintenance plans to prevent future issues.';
      }
      break;
      
    case 'closing':
      if (data.present) {
        commentary += '. The technician properly thanked the customer and closed the call professionally.';
      } else {
        commentary += '. Always thank the customer and end the call on a positive note.';
      }
      break;
  }
  
  return commentary;
}

function generateAnalysis() {
  console.log('🔍 Analyzing call transcript...\n');
  
  // Analyze stages
  const stages = analyzeCallStages();
  
  // Calculate scores
  const scores = calculateComplianceScores(stages);
  
  // Identify sales insights
  const salesInsights = identifySalesInsights(stages);
  
  // Determine call type
  const callType = determineCallType();
  
  // Build compliance object with full details
  const compliance = {
    introduction: {
      ...stages.introduction,
      score: scores.individual.introduction,
      commentary: generateCommentary('introduction', stages.introduction),
    },
    problemDiagnosis: {
      ...stages.problemDiagnosis,
      score: scores.individual.problemDiagnosis,
      commentary: generateCommentary('problemDiagnosis', stages.problemDiagnosis),
    },
    solutionExplanation: {
      ...stages.solutionExplanation,
      score: scores.individual.solutionExplanation,
      commentary: generateCommentary('solutionExplanation', stages.solutionExplanation),
    },
    upsellAttempts: {
      attempts: stages.upsellAttempts,
      present: stages.upsellAttempts.length > 0,
      count: stages.upsellAttempts.length,
      score: scores.individual.upsellAttempts,
      commentary: generateCommentary('upsellAttempts', stages.upsellAttempts),
    },
    maintenancePlanOffer: {
      ...stages.maintenancePlanOffer,
      score: scores.individual.maintenancePlanOffer,
      commentary: generateCommentary('maintenancePlanOffer', stages.maintenancePlanOffer),
    },
    closing: {
      ...stages.closing,
      score: scores.individual.closing,
      commentary: generateCommentary('closing', stages.closing),
    },
  };
  
  // Generate overall summary
  const summary = generateSummary(scores.overall, callType, compliance);
  
  // Build final analysis object
  const analysis = {
    metadata: {
      callId: transcript.id,
      callType: callType,
      duration: transcript.duration,
      date: new Date().toISOString().split('T')[0],
      participants: [
        'Technician (Speaker A)',
        'Customer (Speaker B)',
      ],
      analyzedAt: new Date().toISOString(),
    },
    compliance: compliance,
    scores: {
      individual: scores.individual,
      overall: scores.overall,
    },
    salesInsights: salesInsights,
    summary: summary,
  };
  
  return analysis;
}

function generateSummary(overallScore, callType, compliance) {
  let summary = `Overall call quality: ${overallScore}/100. `;
  
  if (overallScore >= 85) {
    summary += 'This was an excellent service call with strong compliance across all areas. ';
  } else if (overallScore >= 70) {
    summary += 'This was a good service call with most compliance elements present. ';
  } else if (overallScore >= 50) {
    summary += 'This service call had fair performance with several areas needing improvement. ';
  } else {
    summary += 'This service call needs significant improvement in multiple areas. ';
  }
  
  summary += `Call type identified as: ${callType}. `;
  
  // Highlight strengths
  const strengths = [];
  if (compliance.introduction.quality === 'excellent' || compliance.introduction.quality === 'good') {
    strengths.push('strong introduction');
  }
  if (compliance.problemDiagnosis.quality === 'excellent' || compliance.problemDiagnosis.quality === 'good') {
    strengths.push('thorough problem diagnosis');
  }
  if (compliance.solutionExplanation.quality === 'excellent' || compliance.solutionExplanation.quality === 'good') {
    strengths.push('clear solution explanation');
  }
  
  if (strengths.length > 0) {
    summary += `Strengths include ${strengths.join(', ')}. `;
  }
  
  // Highlight improvement areas
  const improvements = [];
  if (!compliance.introduction.present || compliance.introduction.quality === 'poor') {
    improvements.push('introduction');
  }
  if (!compliance.upsellAttempts.present) {
    improvements.push('upselling');
  }
  if (!compliance.maintenancePlanOffer.present) {
    improvements.push('maintenance plan offering');
  }
  
  if (improvements.length > 0) {
    summary += `Areas for improvement: ${improvements.join(', ')}.`;
  }
  
  return summary;
}

function main() {
  try {
    console.log('🚀 Starting analysis process...\n');
    
    // Generate analysis
    const analysis = generateAnalysis();
    
    // Save to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(analysis, null, 2));
    
    console.log('✅ Analysis completed!');
    console.log(`📊 Overall Score: ${analysis.scores.overall}/100`);
    console.log(`📞 Call Type: ${analysis.metadata.callType}`);
    console.log(`💡 Sales Insights: ${analysis.salesInsights.length} identified`);
    console.log(`\n💾 Analysis saved to: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

