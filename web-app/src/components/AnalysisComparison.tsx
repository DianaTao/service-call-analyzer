import React from 'react';
import { FaRobot, FaCode, FaBalanceScale, FaChartBar } from 'react-icons/fa';
import type { Analysis } from '../types';

interface AnalysisComparisonProps {
  ruleBasedAnalysis: Analysis;
  aiAnalysis: Analysis;
}

export const AnalysisComparison: React.FC<AnalysisComparisonProps> = ({
  ruleBasedAnalysis,
  aiAnalysis,
}) => {
  const stages = [
    { key: 'introduction', label: 'Introduction' },
    { key: 'problemDiagnosis', label: 'Problem Diagnosis' },
    { key: 'solutionExplanation', label: 'Solution Explanation' },
    { key: 'upsellAttempts', label: 'Upsell Attempts' },
    { key: 'maintenancePlanOffer', label: 'Maintenance Plan' },
    { key: 'closing', label: 'Closing' },
  ];

  const getScoreDifference = (ruleScore: number, aiScore: number) => {
    const diff = aiScore - ruleScore;
    if (Math.abs(diff) <= 5) return { text: 'Similar', color: 'text-green-600', bg: 'bg-green-50' };
    if (diff > 0) return { text: `AI +${diff}`, color: 'text-blue-600', bg: 'bg-blue-50' };
    return { text: `AI ${diff}`, color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const overallDiff = aiAnalysis.scores.overall - ruleBasedAnalysis.scores.overall;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-4">
          <FaBalanceScale className="text-3xl text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Analysis Comparison</h2>
            <p className="text-sm text-gray-600">
              Rule-Based Algorithm vs. AI-Enhanced Analysis
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Rule-Based */}
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
            <div className="flex items-center gap-2 mb-2">
              <FaCode className="text-blue-600" />
              <h3 className="font-semibold text-gray-800">Rule-Based</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {ruleBasedAnalysis.scores.overall}
              <span className="text-lg text-gray-500">/100</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Custom algorithm with keyword matching and pattern detection
            </p>
          </div>

          {/* AI-Enhanced */}
          <div className="bg-white rounded-lg p-4 border-2 border-purple-300">
            <div className="flex items-center gap-2 mb-2">
              <FaRobot className="text-purple-600" />
              <h3 className="font-semibold text-gray-800">AI-Enhanced</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {aiAnalysis.scores.overall}
              <span className="text-lg text-gray-500">/100</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {'model' in aiAnalysis.metadata ? (aiAnalysis.metadata as { model: string }).model : 'GPT-4 Turbo'} with contextual understanding
            </p>
          </div>

          {/* Difference */}
          <div className="bg-white rounded-lg p-4 border-2 border-green-300">
            <div className="flex items-center gap-2 mb-2">
              <FaChartBar className="text-green-600" />
              <h3 className="font-semibold text-gray-800">Difference</h3>
            </div>
            <div className={`text-3xl font-bold ${overallDiff >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
              {overallDiff > 0 ? '+' : ''}{overallDiff}
              <span className="text-lg text-gray-500"> pts</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {Math.abs(overallDiff) <= 5 ? 'High agreement' : 
               Math.abs(overallDiff) <= 10 ? 'Moderate difference' : 'Significant difference'}
            </p>
          </div>
        </div>
      </div>

      {/* Stage-by-Stage Comparison */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Stage-by-Stage Comparison</h3>
        <div className="space-y-3">
          {stages.map((stage) => {
            const ruleScore = ruleBasedAnalysis.scores.individual[stage.key];
            const aiScore = aiAnalysis.scores.individual[stage.key];
            const diff = getScoreDifference(ruleScore, aiScore);

            return (
              <div key={stage.key} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{stage.label}</h4>
                  <span className={`text-sm px-3 py-1 rounded-full ${diff.bg} ${diff.color} font-medium`}>
                    {diff.text}
                  </span>
                </div>
                
                {/* Visual comparison bars */}
                <div className="space-y-2">
                  {/* Rule-Based Score */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaCode className="text-blue-600" />
                        Rule-Based
                      </span>
                      <span className="font-medium text-blue-600">{ruleScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          ruleScore >= 85 ? 'bg-green-500' :
                          ruleScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${ruleScore}%` }}
                      />
                    </div>
                  </div>

                  {/* AI Score */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 flex items-center gap-2">
                        <FaRobot className="text-purple-600" />
                        AI-Enhanced
                      </span>
                      <span className="font-medium text-purple-600">{aiScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          aiScore >= 85 ? 'bg-green-500' :
                          aiScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${aiScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Insights */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Rule-Based: </span>
                      <span className="text-gray-600">
                        {(() => {
                          const item = ruleBasedAnalysis.compliance[stage.key as keyof typeof ruleBasedAnalysis.compliance];
                          if (stage.key === 'upsellAttempts') {
                            return `${(item as any).count} attempt${(item as any).count !== 1 ? 's' : ''} detected`;
                          }
                          return item && (item as { quality: string }).quality;
                        })()}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">AI: </span>
                      <span className="text-gray-600">
                        {(() => {
                          const item = aiAnalysis.compliance[stage.key as keyof typeof aiAnalysis.compliance];
                          if (stage.key === 'upsellAttempts') {
                            return `${(item as any).count} attempt${(item as any).count !== 1 ? 's' : ''} detected`;
                          }
                          return item && (item as { quality: string }).quality;
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Differences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card border-2 border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaCode className="text-blue-600" />
            Rule-Based Strengths
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Consistent:</strong> Same criteria applied every time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Transparent:</strong> Every score can be traced to specific rules</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Fast:</strong> Instant analysis with no API costs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✓</span>
              <span><strong>Customizable:</strong> Easy to adjust weights and thresholds</span>
            </li>
          </ul>
        </div>

        <div className="card border-2 border-purple-200">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaRobot className="text-purple-600" />
            AI-Enhanced Strengths
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><strong>Contextual:</strong> Understands nuance and conversation flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><strong>Detailed:</strong> Provides specific examples and observations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><strong>Holistic:</strong> Considers tone, intent, and customer reaction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">✓</span>
              <span><strong>Adaptive:</strong> Learns from conversation patterns</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Methodology Explanation */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800 mb-3">📚 Analysis Methodologies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
              <FaCode />
              Rule-Based Algorithm
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Uses keyword detection, pattern matching, and predefined rules to evaluate each stage. 
              Scores based on presence of specific elements (greetings, questions, keywords) and 
              quantitative metrics (question count, response length, timing). Weights applied: 
              Introduction (15%), Diagnosis (25%), Solution (25%), Upsell (10%), Maintenance (10%), 
              Closing (15%).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
              <FaRobot />
              AI-Enhanced Analysis
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Powered by GPT-4 Turbo, analyzes conversation semantics, context, and flow. 
              Evaluates professionalism, rapport-building, technical competence, and customer 
              engagement. Provides actionable insights with specific examples. Considers factors 
              like tone, timing, customer reactions, and overall consultation quality beyond 
              simple keyword presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

