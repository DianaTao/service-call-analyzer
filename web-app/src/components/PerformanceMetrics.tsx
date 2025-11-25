import React from 'react';
import { FaQuestion, FaClock, FaComments, FaSmile } from 'react-icons/fa';
import type { Analysis, Transcript } from '../types';

interface PerformanceMetricsProps {
  analysis: Analysis;
  transcript: Transcript;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ analysis, transcript }) => {
  // Calculate metrics
  const technicianUtterances = transcript.utterances.filter(u => u.speakerLabel === 'Technician');
  const customerUtterances = transcript.utterances.filter(u => u.speakerLabel === 'Customer');
  
  const questionsAsked = analysis.compliance.problemDiagnosis.questionCount || 
    technicianUtterances.filter(u => u.text.includes('?')).length;
  
  const talkTimeRatio = technicianUtterances.length > 0 
    ? Math.round((customerUtterances.length / technicianUtterances.length) * 100) 
    : 0;
  
  const avgResponseLength = technicianUtterances.length > 0
    ? Math.round(technicianUtterances.reduce((sum, u) => sum + u.text.length, 0) / technicianUtterances.length)
    : 0;

  const metrics = [
    {
      icon: <FaQuestion />,
      label: 'Questions Asked',
      value: questionsAsked,
      subtitle: 'During diagnosis',
      color: 'blue',
      benchmark: '3+',
      status: questionsAsked >= 3 ? 'good' : 'warning',
    },
    {
      icon: <FaClock />,
      label: 'Call Duration',
      value: analysis.metadata.duration,
      subtitle: 'Total time',
      color: 'purple',
      benchmark: 'Varies',
      status: 'neutral',
    },
    {
      icon: <FaComments />,
      label: 'Talk Balance',
      value: `${talkTimeRatio}%`,
      subtitle: 'Customer talk ratio',
      color: 'green',
      benchmark: '40-60%',
      status: talkTimeRatio >= 40 && talkTimeRatio <= 60 ? 'good' : 'warning',
    },
    {
      icon: <FaSmile />,
      label: 'Avg Response',
      value: `${avgResponseLength}`,
      subtitle: 'Characters per response',
      color: 'teal',
      benchmark: '100+',
      status: avgResponseLength >= 100 ? 'good' : 'neutral',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <span className="text-xs badge-success">✓ Good</span>;
      case 'warning':
        return <span className="text-xs badge-warning">⚠ Review</span>;
      default:
        return <span className="text-xs badge-info">– Neutral</span>;
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`text-${metric.color}-600 text-xl`}>
                {metric.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-700">{metric.label}</h3>
            </div>
            <div className="mb-1">
              <div className="text-3xl font-bold text-gray-800">{metric.value}</div>
              <p className="text-xs text-gray-600">{metric.subtitle}</p>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-500">Benchmark: {metric.benchmark}</span>
              {getStatusBadge(metric.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

