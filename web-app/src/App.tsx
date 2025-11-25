import { useState } from 'react';
import { Header } from './components/Header';
import { MetricsDashboard } from './components/MetricsDashboard';
import { ComplianceCard } from './components/ComplianceCard';
import { SalesInsights } from './components/SalesInsights';
import { TranscriptViewer } from './components/TranscriptViewer';
import {
  FaHandshake,
  FaStethoscope,
  FaWrench,
  FaChartLine,
  FaShieldAlt,
  FaDoorOpen,
} from 'react-icons/fa';
import type { Analysis, Transcript } from './types';

// Import data files - these will be created after transcription and analysis
// For now, we'll use placeholder data structure
import analysisData from './data/analysis.json';
import transcriptData from './data/transcript.json';

const analysis = analysisData as Analysis;
const transcript = transcriptData as Transcript;

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'transcript' | 'compliance' | 'sales'>('all');

  const tabs = [
    { id: 'all' as const, label: 'All', icon: '📊' },
    { id: 'compliance' as const, label: 'Compliance', icon: '✓' },
    { id: 'sales' as const, label: 'Sales', icon: '💰' },
    { id: 'transcript' as const, label: 'Transcript', icon: '📝' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        callType={analysis.metadata.callType}
        duration={analysis.metadata.duration}
        date={analysis.metadata.date}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Summary Card */}
        <div className="card mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
          <h2 className="text-xl font-bold text-gray-800 mb-2">📋 Executive Summary</h2>
          <p className="text-gray-700">{analysis.summary}</p>
        </div>

        {/* Metrics Dashboard */}
        <MetricsDashboard
          overallScore={analysis.scores.overall}
          individualScores={analysis.scores.individual}
        />

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        <div className="space-y-6">
          {(activeTab === 'all' || activeTab === 'compliance') && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ✓ Compliance Analysis
              </h2>
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

          {(activeTab === 'all' || activeTab === 'sales') && (
            <SalesInsights insights={analysis.salesInsights} />
          )}

          {(activeTab === 'all' || activeTab === 'transcript') && (
            <TranscriptViewer transcript={transcript} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Service Call Analysis Tool • Generated on {new Date(analysis.metadata.analyzedAt).toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
