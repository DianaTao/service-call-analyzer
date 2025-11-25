import React from 'react';
import { FaHandshake, FaStethoscope, FaWrench, FaChartLine, FaShieldAlt, FaDoorOpen, FaClock } from 'react-icons/fa';
import type { Compliance } from '../types';

interface CallTimelineProps {
  compliance: Compliance;
  duration: string;
}

export const CallTimeline: React.FC<CallTimelineProps> = ({ compliance, duration }) => {
  const stages = [
    {
      name: 'Introduction',
      icon: <FaHandshake />,
      data: compliance.introduction,
      color: 'blue',
    },
    {
      name: 'Problem Diagnosis',
      icon: <FaStethoscope />,
      data: compliance.problemDiagnosis,
      color: 'purple',
    },
    {
      name: 'Solution Explanation',
      icon: <FaWrench />,
      data: compliance.solutionExplanation,
      color: 'indigo',
    },
    {
      name: 'Upsell Attempts',
      icon: <FaChartLine />,
      data: compliance.upsellAttempts,
      color: 'green',
    },
    {
      name: 'Maintenance Plan',
      icon: <FaShieldAlt />,
      data: compliance.maintenancePlanOffer,
      color: 'teal',
    },
    {
      name: 'Closing',
      icon: <FaDoorOpen />,
      data: compliance.closing,
      color: 'cyan',
    },
  ];

  const getStatusColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaClock className="text-blue-600 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">Call Timeline</h2>
        <span className="ml-auto text-sm text-gray-600">Total Duration: {duration}</span>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" />
        
        {/* Timeline items */}
        <div className="space-y-6">
          {stages.map((stage, idx) => {
            const data = stage.data as any;
            const timestamp = data.timestamp || (data.attempts && data.attempts[0]?.timestamp) || 'N/A';
            const score = data.score || 0;
            const present = data.present !== false;
            
            return (
              <div key={idx} className="relative pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-4 w-5 h-5 rounded-full ${getStatusColor(score)} border-4 border-white shadow-md flex items-center justify-center`}>
                  {present && score >= 70 && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
                
                {/* Content */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-blue-600 text-lg">
                      {stage.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{stage.name}</h3>
                        <span className="text-xs text-gray-500">{timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getStatusColor(score)}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{score}/100</span>
                      </div>
                    </div>
                  </div>
                  {!present && (
                    <p className="text-sm text-red-600 mt-2">⚠️ Not completed during call</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

