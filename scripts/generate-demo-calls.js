import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎭 Generating demo calls for scalability demonstration...\n');

// Load the real transcript as a template
const realTranscript = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/transcript.json'), 'utf8'));

// Generate 4 additional demo calls with variations
const demoScenarios = [
  {
    id: 2,
    type: 'Excellent',
    callType: 'Routine Maintenance',
    scoreMod: +15,
    description: 'Professional maintenance call with excellent compliance'
  },
  {
    id: 3,
    type: 'Good',
    callType: 'Emergency Repair',
    scoreMod: +5,
    description: 'Emergency repair with good technician performance'
  },
  {
    id: 4,
    type: 'Fair',
    callType: 'Installation',
    scoreMod: -10,
    description: 'Installation with fair compliance, missing some elements'
  },
  {
    id: 5,
    type: 'Poor',
    callType: 'Consultation',
    scoreMod: -20,
    description: 'Consultation call needing improvement'
  }
];

demoScenarios.forEach(scenario => {
  // Create modified transcript
  const transcript = {
    ...realTranscript,
    id: `demo-call-${scenario.id}-${Date.now()}`,
    metadata: {
      ...realTranscript.metadata,
      audioFile: `demo_call_${scenario.id}.m4a`,
      description: scenario.description
    }
  };
  
  // Save transcript
  fs.writeFileSync(
    path.join(__dirname, `../data/transcript-demo-${scenario.id}.json`),
    JSON.stringify(transcript, null, 2)
  );
  
  // Load real analyses
  const realRuleAnalysis = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/analysis.json'), 'utf8'));
  const realAiAnalysis = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/analysis-ai.json'), 'utf8'));
  
  // Modify scores based on scenario
  const modifyScores = (analysis, mod) => {
    const modified = JSON.parse(JSON.stringify(analysis));
    
    // Modify individual scores
    Object.keys(modified.scores.individual).forEach(key => {
      modified.scores.individual[key] = Math.max(0, Math.min(100, modified.scores.individual[key] + mod + (Math.random() * 10 - 5)));
    });
    
    // Recalculate overall
    modified.scores.overall = Math.round(
      Object.values(modified.scores.individual).reduce((a, b) => a + b, 0) / Object.keys(modified.scores.individual).length
    );
    
    // Update metadata
    modified.metadata.callId = transcript.id;
    modified.metadata.callType = scenario.callType;
    modified.metadata.analyzedAt = new Date().toISOString();
    
    return modified;
  };
  
  const ruleAnalysis = modifyScores(realRuleAnalysis, scenario.scoreMod);
  const aiAnalysis = modifyScores(realAiAnalysis, scenario.scoreMod + 5);
  
  // Save analyses
  fs.writeFileSync(
    path.join(__dirname, `../data/analysis-demo-${scenario.id}.json`),
    JSON.stringify(ruleAnalysis, null, 2)
  );
  
  fs.writeFileSync(
    path.join(__dirname, `../data/analysis-ai-demo-${scenario.id}.json`),
    JSON.stringify(aiAnalysis, null, 2)
  );
  
  console.log(`✅ Generated Demo Call ${scenario.id}: ${scenario.type} (${scenario.callType})`);
  console.log(`   Rule-Based Score: ${ruleAnalysis.scores.overall}/100`);
  console.log(`   AI Score: ${aiAnalysis.scores.overall}/100\n`);
});

console.log('🎉 Demo calls generated successfully!');
console.log('Run "npm run analyze-batch" to process all calls together.');

