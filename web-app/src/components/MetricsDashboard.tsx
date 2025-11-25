import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTrophy } from 'react-icons/fa';

interface MetricsDashboardProps {
  overallScore: number;
  individualScores: { [key: string]: number };
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  overallScore,
  individualScores,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return <FaCheckCircle className="text-green-500" />;
    if (score >= 70) return <FaExclamationTriangle className="text-yellow-500" />;
    return <FaTimesCircle className="text-red-500" />;
  };

  const stageNames: { [key: string]: string } = {
    introduction: 'Introduction',
    problemDiagnosis: 'Problem Diagnosis',
    solutionExplanation: 'Solution Explanation',
    upsellAttempts: 'Upsell Attempts',
    maintenancePlanOffer: 'Maintenance Plan',
    closing: 'Closing',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Overall Score */}
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Overall Score</h3>
          <FaTrophy className="text-blue-600 text-xl" />
        </div>
        <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
          {overallScore}
          <span className="text-2xl text-gray-500">/100</span>
        </div>
      </div>

      {/* Individual Scores */}
      {Object.entries(individualScores).map(([key, score]) => (
        <div key={key} className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">{stageNames[key]}</h3>
            {getScoreIcon(score)}
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
            <span className="text-lg text-gray-500">/100</span>
          </div>
        </div>
      ))}
    </div>
  );
};

