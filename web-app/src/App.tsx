import { useState } from 'react';
import { Header } from './components/Header';
import { KeyInsights } from './components/KeyInsights';
import { MetricsDashboard } from './components/MetricsDashboard';
import { CallTimeline } from './components/CallTimeline';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { ComplianceCard } from './components/ComplianceCard';
import { SalesInsights } from './components/SalesInsights';
import { TranscriptViewer } from './components/TranscriptViewer';
import { AnalysisComparison } from './components/AnalysisComparison';
import { BatchAnalysis } from './components/BatchAnalysis';
import { Footer } from './components/Footer';
import {
  FaHandshake,
  FaStethoscope,
  FaWrench,
  FaChartLine,
  FaShieldAlt,
  FaDoorOpen,
  FaClipboardList,
} from 'react-icons/fa';
import type { Analysis, Transcript } from './types';

// Import data files
import analysisData from './data/analysis.json';
import aiAnalysisData from './data/analysis-ai.json';
import transcriptData from './data/transcript.json';
import batchData from './data/batch-analysis.json';

const analysis = analysisData as Analysis;
const aiAnalysis = aiAnalysisData as any; // AI analysis has extended fields
const transcript = transcriptData as Transcript;

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'compliance' | 'sales' | 'comparison' | 'batch'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '📊', description: 'Key insights & metrics' },
    { id: 'comparison' as const, label: 'AI vs Rule-Based', icon: '⚖️', description: 'Method comparison' },
    { id: 'compliance' as const, label: 'Compliance', icon: '✓', description: 'Detailed stage analysis' },
    { id: 'sales' as const, label: 'Sales', icon: '💰', description: 'Opportunities & insights' },
    { id: 'transcript' as const, label: 'Transcript', icon: '📝', description: 'Full conversation' },
    { id: 'batch' as const, label: 'Scalability', icon: '🚀', description: 'Batch processing demo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        callType={analysis.metadata.callType}
        duration={analysis.metadata.duration}
        date={analysis.metadata.date}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Summary Card */}
        <div className="card mb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
              <FaClipboardList className="text-3xl" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                Executive Summary
                <span className="text-sm font-normal text-gray-600">
                  ({analysis.metadata.callType})
                </span>
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">{analysis.summary}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-semibold text-gray-700">Rule-Based:</span>
                  <span className={`text-2xl font-bold ${
                    analysis.scores.overall >= 85 ? 'text-green-600' :
                    analysis.scores.overall >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.scores.overall}/100
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-semibold text-gray-700">AI-Enhanced:</span>
                  <span className={`text-2xl font-bold ${
                    aiAnalysis.scores.overall >= 85 ? 'text-green-600' :
                    aiAnalysis.scores.overall >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {aiAnalysis.scores.overall}/100
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <span className="text-gray-600">{analysis.metadata.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights Cards */}
        <KeyInsights analysis={analysis} />

        {/* Metrics Dashboard */}
        <MetricsDashboard
          overallScore={analysis.scores.overall}
          individualScores={analysis.scores.individual}
        />

        {/* Performance Metrics */}
        <PerformanceMetrics analysis={analysis} transcript={transcript} />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] px-4 py-3 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50 border-b-4 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <span className="font-semibold text-sm">{tab.label}</span>
                  <span className="text-xs text-gray-500 mt-1">{tab.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <CallTimeline compliance={analysis.compliance} duration={analysis.metadata.duration} />
              
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Quick Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Compliance Highlights</h3>
                    <ul className="space-y-2 text-sm">
                      {Object.entries(analysis.compliance).map(([key, value]) => {
                        if (key === 'upsellAttempts') {
                          return (
                            <li key={key} className="flex items-center gap-2">
                              {value.present ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-600">✗</span>
                              )}
                              <span className="text-gray-700">
                                Upsell Attempts: {value.count} detected
                              </span>
                            </li>
                          );
                        }
                        const item = value as any;
                        return (
                          <li key={key} className="flex items-center gap-2">
                            {item.present ? (
                              <span className="text-green-600">✓</span>
                            ) : (
                              <span className="text-red-600">✗</span>
                            )}
                            <span className="text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}: {item.quality}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Sales Overview</h3>
                    <ul className="space-y-2 text-sm">
                      {analysis.salesInsights.map((insight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className={insight.type === 'opportunity_taken' ? 'text-green-600' : 'text-yellow-600'}>
                            {insight.type === 'opportunity_taken' ? '✓' : '⚠'}
                          </span>
                          <span className="text-gray-700">{insight.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && (
            <AnalysisComparison ruleBasedAnalysis={analysis} aiAnalysis={aiAnalysis} />
          )}

          {activeTab === 'compliance' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ✓ Detailed Compliance Analysis
              </h2>
              <p className="text-gray-600 mb-6">
                Each stage is evaluated on a 0-100 scale based on multiple quality criteria. 
                Expand cards for detailed insights and recommendations.
              </p>
              <ComplianceCard
                title="Introduction"
                item={analysis.compliance.introduction}
                icon={<FaHandshake />}
              />
              <ComplianceCard
                title="Problem Diagnosis"
                item={analysis.compliance.problemDiagnosis}
                icon={<FaStethoscope />}
              />
              <ComplianceCard
                title="Solution Explanation"
                item={analysis.compliance.solutionExplanation}
                icon={<FaWrench />}
              />
              <ComplianceCard
                title="Upsell Attempts"
                item={analysis.compliance.upsellAttempts}
                icon={<FaChartLine />}
              />
              <ComplianceCard
                title="Maintenance Plan Offer"
                item={analysis.compliance.maintenancePlanOffer}
                icon={<FaShieldAlt />}
              />
              <ComplianceCard
                title="Closing & Thank You"
                item={analysis.compliance.closing}
                icon={<FaDoorOpen />}
              />
            </div>
          )}

          {activeTab === 'sales' && (
            <div>
              <SalesInsights insights={analysis.salesInsights} />
              
              {/* Additional Sales Context */}
              <div className="card mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Sales Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700">
                      {analysis.salesInsights.filter(i => i.type === 'opportunity_taken').length}
                    </div>
                    <div className="text-sm text-gray-700">Opportunities Taken</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-700">
                      {analysis.salesInsights.filter(i => i.type === 'opportunity_missed').length}
                    </div>
                    <div className="text-sm text-gray-700">Opportunities Missed</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700">
                      {analysis.salesInsights.length}
                    </div>
                    <div className="text-sm text-gray-700">Total Insights</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div>
              <TranscriptViewer transcript={transcript} />
              
              {/* Transcript Stats */}
              <div className="card mt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Transcript Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{transcript.utterances.length}</div>
                    <div className="text-sm text-gray-600">Total Utterances</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {transcript.utterances.filter(u => u.speakerLabel === 'Technician').length}
                    </div>
                    <div className="text-sm text-gray-600">Technician</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {transcript.utterances.filter(u => u.speakerLabel === 'Customer').length}
                    </div>
                    <div className="text-sm text-gray-600">Customer</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-teal-600">
                      {transcript.fullText.split(' ').length}
                    </div>
                    <div className="text-sm text-gray-600">Total Words</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'batch' && (
            <BatchAnalysis batchData={batchData} />
          )}
        </div>
      </div>

      <Footer analyzedAt={analysis.metadata.analyzedAt} />
    </div>
  );
}

export default App;
