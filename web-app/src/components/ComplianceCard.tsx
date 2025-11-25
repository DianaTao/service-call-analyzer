import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { ComplianceItem } from '../types';

interface ComplianceCardProps {
  title: string;
  item: ComplianceItem | any;
  icon: React.ReactNode;
}

export const ComplianceCard: React.FC<ComplianceCardProps> = ({ title, item, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getQualityBadge = (quality: string) => {
    const badges = {
      excellent: 'badge-success',
      good: 'badge-success',
      fair: 'badge-warning',
      poor: 'badge-danger',
      missing: 'badge-danger',
    };
    return badges[quality as keyof typeof badges] || 'badge-info';
  };

  const getQualityText = (quality: string) => {
    return quality.charAt(0).toUpperCase() + quality.slice(1);
  };

  // Handle upsellAttempts which has different structure
  const quality = item.quality || (item.present ? 'good' : 'missing');
  const score = item.score || 0;
  const transcript = item.transcript || (item.attempts && item.attempts[0]?.transcript) || '';
  const timestamp = item.timestamp || (item.attempts && item.attempts[0]?.timestamp) || 'N/A';

  return (
    <div className="card mb-4 border-l-4 border-blue-500">
      <div
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl text-blue-600 mt-1">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <span className={`badge ${getQualityBadge(quality)}`}>
                {getQualityText(quality)}
              </span>
              <span className="text-sm text-gray-500">Score: {score}/100</span>
            </div>
            {!isExpanded && (
              <p className="text-sm text-gray-600">{item.commentary}</p>
            )}
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-3">
            {timestamp !== 'N/A' && (
              <div>
                <span className="font-semibold text-gray-700">Timestamp:</span>
                <span className="ml-2 text-gray-600">{timestamp}</span>
              </div>
            )}

            <div>
              <span className="font-semibold text-gray-700">Analysis:</span>
              <p className="mt-1 text-gray-600">{item.commentary}</p>
            </div>

            {transcript && (
              <div>
                <span className="font-semibold text-gray-700">Transcript Excerpt:</span>
                <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm text-gray-700 italic whitespace-pre-wrap">
                    {transcript}
                  </p>
                </div>
              </div>
            )}

            {item.questionCount !== undefined && (
              <div>
                <span className="font-semibold text-gray-700">Questions Asked:</span>
                <span className="ml-2 text-gray-600">{item.questionCount}</span>
              </div>
            )}

            {item.attempts && item.attempts.length > 0 && (
              <div>
                <span className="font-semibold text-gray-700">
                  Attempts: {item.attempts.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

