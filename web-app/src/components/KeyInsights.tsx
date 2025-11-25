import React from 'react';
import { FaStar, FaExclamationTriangle, FaLightbulb, FaChartLine } from 'react-icons/fa';
import type { Analysis } from '../types';

interface KeyInsightsProps {
  analysis: Analysis;
}

export const KeyInsights: React.FC<KeyInsightsProps> = ({ analysis }) => {
  // Extract key insights from analysis
  const strengths: string[] = [];
  const improvements: string[] = [];
  const opportunities: string[] = [];
  
  // Analyze strengths
  if (analysis.compliance.introduction.score >= 80) {
    strengths.push('Professional introduction with clear identification');
  }
  if (analysis.compliance.problemDiagnosis.score >= 80) {
    strengths.push('Thorough problem diagnosis with active listening');
  }
  if (analysis.compliance.solutionExplanation.score >= 80) {
    strengths.push('Clear and detailed solution explanation');
  }
  if (analysis.compliance.closing.score >= 80) {
    strengths.push('Professional closing with proper courtesies');
  }
  
  // Analyze improvements
  if (analysis.compliance.introduction.score < 70) {
    improvements.push('Enhance introduction with company name and technician identification');
  }
  if (analysis.compliance.problemDiagnosis.score < 70) {
    improvements.push('Ask more probing questions to fully understand customer concerns');
  }
  if (analysis.compliance.solutionExplanation.score < 70) {
    improvements.push('Provide more detailed explanation of work performed');
  }
  if (!analysis.compliance.upsellAttempts.present) {
    improvements.push('Identify and suggest relevant additional services');
  }
  if (!analysis.compliance.maintenancePlanOffer.present) {
    improvements.push('Present maintenance plan options to prevent future issues');
  }
  
  // Sales opportunities
  analysis.salesInsights.forEach(insight => {
    if (insight.type === 'opportunity_missed') {
      opportunities.push(insight.recommendation);
    }
  });
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Strengths */}
      <div className="card border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <FaStar className="text-green-600 text-xl" />
          <h3 className="text-lg font-bold text-gray-800">Key Strengths</h3>
        </div>
        {strengths.length > 0 ? (
          <ul className="space-y-2">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-600 mt-1">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 italic">Review individual stages for specific strengths</p>
        )}
      </div>
      
      {/* Improvements */}
      <div className="card border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <FaExclamationTriangle className="text-yellow-600 text-xl" />
          <h3 className="text-lg font-bold text-gray-800">Areas to Improve</h3>
        </div>
        {improvements.length > 0 ? (
          <ul className="space-y-2">
            {improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-yellow-600 mt-1">▸</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 italic">Excellent performance across all areas!</p>
        )}
      </div>
      
      {/* Opportunities */}
      <div className="card border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <FaLightbulb className="text-blue-600 text-xl" />
          <h3 className="text-lg font-bold text-gray-800">Sales Opportunities</h3>
        </div>
        {opportunities.length > 0 ? (
          <ul className="space-y-2">
            {opportunities.map((opportunity, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-600 mt-1">💡</span>
                <span>{opportunity}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">
            <FaChartLine className="inline mr-1" />
            All sales opportunities were successfully pursued!
          </p>
        )}
      </div>
    </div>
  );
};

