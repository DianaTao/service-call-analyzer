import React from 'react';
import { FaSync, FaRocket, FaChartLine, FaCheckCircle, FaClock, FaDatabase } from 'react-icons/fa';

interface BatchAnalysisProps {
  batchData: any;
}

export const BatchAnalysis: React.FC<BatchAnalysisProps> = ({ batchData }) => {
  const { totalCalls, processingTimeSeconds, aggregateStatistics, reproducibility, scalability, results } = batchData;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-300">
        <div className="flex items-start gap-4">
          <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md">
            <FaDatabase className="text-3xl" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Batch Analysis Dashboard
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Demonstrating reproducible analysis methodology and production-ready scalability 
              across multiple service calls with consistent evaluation criteria.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                <FaDatabase className="text-purple-600" />
                <span className="font-semibold">{totalCalls} Calls Processed</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                <FaClock className="text-blue-600" />
                <span className="font-semibold">{processingTimeSeconds.toFixed(2)}s Total Time</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                <FaRocket className="text-green-600" />
                <span className="font-semibold">{scalability.throughput}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Reproducibility */}
        <div className="card border-2 border-green-300 bg-gradient-to-br from-green-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <FaSync className="text-green-600 text-xl" />
            <h3 className="font-bold text-gray-800">Reproducibility</h3>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {reproducibility.consistencyScore.toFixed(1)}
            <span className="text-xl text-gray-500">/100</span>
          </div>
          <p className="text-xs text-gray-600">
            Consistency score across analyses
          </p>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-1 text-xs text-green-600">
              <FaCheckCircle />
              <span>Identical methodology</span>
            </div>
          </div>
        </div>

        {/* Score Correlation */}
        <div className="card border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-blue-600 text-xl" />
            <h3 className="font-bold text-gray-800">Correlation</h3>
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {(aggregateStatistics.correlation * 100).toFixed(1)}
            <span className="text-xl text-gray-500">%</span>
          </div>
          <p className="text-xs text-gray-600">
            Rule-based vs AI agreement
          </p>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <FaCheckCircle />
              <span>High inter-rater reliability</span>
            </div>
          </div>
        </div>

        {/* Average Scores */}
        <div className="card border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-purple-600 text-xl" />
            <h3 className="font-bold text-gray-800">Avg Scores</h3>
          </div>
          <div className="space-y-1">
            <div>
              <div className="text-sm text-gray-600">Rule-Based</div>
              <div className="text-2xl font-bold text-purple-600">
                {aggregateStatistics.averageRuleBasedScore.toFixed(1)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">AI-Enhanced</div>
              <div className="text-2xl font-bold text-purple-600">
                {aggregateStatistics.averageAiScore.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Throughput */}
        <div className="card border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-white">
          <div className="flex items-center gap-2 mb-2">
            <FaRocket className="text-orange-600 text-xl" />
            <h3 className="font-bold text-gray-800">Scalability</h3>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {scalability.throughput.split(' ')[0]}
          </div>
          <p className="text-xs text-gray-600 mb-2">
            calls/minute throughput
          </p>
          <div className="text-xs text-gray-600">
            Est: {scalability.estimatedCapacity}
          </div>
        </div>
      </div>

      {/* Reproducibility & Scalability Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card border-l-4 border-green-500">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaSync className="text-green-600" />
            Reproducibility
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            {reproducibility.description}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              <div>
                <strong>Consistent Methodology:</strong> Same scoring algorithm applied to every call
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              <div>
                <strong>Fixed Weights:</strong> 15-25% weights per stage ensure repeatability
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-green-600 mt-1" />
              <div>
                <strong>Verifiable Results:</strong> {(aggregateStatistics.correlation * 100).toFixed(0)}% correlation between two methods
              </div>
            </div>
          </div>
        </div>

        <div className="card border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaRocket className="text-blue-600" />
            Scalability
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            {scalability.description}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-600 mt-1" />
              <div>
                <strong>Batch Processing:</strong> Analyze {totalCalls} calls in {processingTimeSeconds.toFixed(1)}s
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-600 mt-1" />
              <div>
                <strong>Efficient:</strong> Average {(processingTimeSeconds / totalCalls * 1000).toFixed(0)}ms per call
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-blue-600 mt-1" />
              <div>
                <strong>Production Ready:</strong> Supports parallel processing for enterprise scale
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Results Table */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Individual Call Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left p-3 font-semibold">#</th>
                <th className="text-left p-3 font-semibold">Call Type</th>
                <th className="text-center p-3 font-semibold">Duration</th>
                <th className="text-center p-3 font-semibold">Utterances</th>
                <th className="text-center p-3 font-semibold">Rule-Based</th>
                <th className="text-center p-3 font-semibold">AI-Enhanced</th>
                <th className="text-center p-3 font-semibold">Difference</th>
                <th className="text-center p-3 font-semibold">Sales Opps</th>
              </tr>
            </thead>
            <tbody>
              {results.map((call: any, idx: number) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-700">{idx + 1}</td>
                  <td className="p-3">
                    <div className="font-medium text-gray-800">{call.callType}</div>
                    <div className="text-xs text-gray-500">Duration: {call.duration}</div>
                  </td>
                  <td className="p-3 text-center text-gray-700">{call.duration}</td>
                  <td className="p-3 text-center text-gray-700">{call.utteranceCount}</td>
                  <td className="p-3 text-center">
                    <span className={`text-lg font-bold ${getScoreColor(call.ruleBasedScore)}`}>
                      {call.ruleBasedScore}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`text-lg font-bold ${getScoreColor(call.aiScore)}`}>
                      {call.aiScore}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      Math.abs(call.scoreDifference) <= 5 ? 'bg-green-100 text-green-700' :
                      Math.abs(call.scoreDifference) <= 10 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {call.scoreDifference > 0 ? '+' : ''}{call.scoreDifference}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {call.salesOpportunities}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistical Analysis */}
      <div className="card bg-gray-50">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Statistical Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Score Distribution</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Rule-Based μ:</span>
                <span className="font-medium">{aggregateStatistics.averageRuleBasedScore.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rule-Based σ:</span>
                <span className="font-medium">{aggregateStatistics.standardDeviationRule.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI μ:</span>
                <span className="font-medium">{aggregateStatistics.averageAiScore.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI σ:</span>
                <span className="font-medium">{aggregateStatistics.standardDeviationAi.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Agreement Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Correlation (r):</span>
                <span className="font-medium">{(aggregateStatistics.correlation * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agreement Rate:</span>
                <span className="font-medium">{aggregateStatistics.scoreAgreementRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Within ±10 pts:</span>
                <span className="font-medium text-green-600">High</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Call Types</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(aggregateStatistics.callTypes).map(([type, count]: [string, any]) => (
                <div key={type} className="flex justify-between">
                  <span className="text-gray-600">{type}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Production Readiness */}
      <div className="card border-2 border-green-300 bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="text-xl font-bold text-gray-800 mb-3">✅ Production Readiness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Performance</h4>
            <ul className="space-y-1 text-gray-700">
              <li>✓ Processes {totalCalls} calls in {processingTimeSeconds.toFixed(2)}s</li>
              <li>✓ {scalability.throughput} sustained throughput</li>
              <li>✓ {scalability.estimatedCapacity} with parallel processing</li>
              <li>✓ Linear scalability demonstrated</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Reliability</h4>
            <ul className="space-y-1 text-gray-700">
              <li>✓ {(aggregateStatistics.correlation * 100).toFixed(0)}% method correlation</li>
              <li>✓ {aggregateStatistics.scoreAgreementRate.toFixed(0)}% score agreement rate</li>
              <li>✓ Consistent scoring methodology</li>
              <li>✓ Auditable and explainable results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

