import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaLightbulb } from 'react-icons/fa';
import type { SalesInsight } from '../types';

interface SalesInsightsProps {
  insights: SalesInsight[];
}

export const SalesInsights: React.FC<SalesInsightsProps> = ({ insights }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'opportunity_taken':
        return <FaCheckCircle className="text-green-500" />;
      case 'opportunity_missed':
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return <FaLightbulb className="text-yellow-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'opportunity_taken':
        return 'badge-success';
      case 'opportunity_missed':
        return 'badge-danger';
      default:
        return 'badge-warning';
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Sales Insights</h2>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl mt-1">{getIcon(insight.type)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${getTypeBadge(insight.type)}`}>
                    {insight.category}
                  </span>
                  {insight.timestamp !== 'N/A' && (
                    <span className="text-sm text-gray-500">
                      at {insight.timestamp}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{insight.description}</p>
                {insight.transcript && (
                  <div className="mb-2 p-2 bg-white rounded border border-gray-200">
                    <p className="text-sm text-gray-600 italic">"{insight.transcript}"</p>
                  </div>
                )}
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-semibold text-blue-600">💡 Recommendation:</span>
                  <span className="text-gray-600">{insight.recommendation}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

