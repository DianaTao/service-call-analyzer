import React from 'react';
import { FaGithub, FaMicrophone, FaReact, FaCode } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiVite } from 'react-icons/si';

interface FooterProps {
  analyzedAt: string;
}

export const Footer: React.FC<FooterProps> = ({ analyzedAt }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <FaMicrophone className="text-blue-400" />
              Service Call Analyzer
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              AI-powered service call analysis with automated compliance evaluation, 
              sales opportunity detection, and performance insights.
            </p>
          </div>
          
          {/* Technology Stack */}
          <div>
            <h3 className="text-lg font-bold mb-3">⚡ Technology Stack</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <FaReact className="text-blue-400" />
                <span>React 18</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <SiTypescript className="text-blue-400" />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <SiTailwindcss className="text-blue-400" />
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <SiVite className="text-purple-400" />
                <span>Vite</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaMicrophone className="text-green-400" />
                <span>AssemblyAI</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <FaCode className="text-yellow-400" />
                <span>Node.js</span>
              </div>
            </div>
          </div>
          
          {/* Analysis Details */}
          <div>
            <h3 className="text-lg font-bold mb-3">📊 Analysis Features</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✓ 6-Stage Compliance Evaluation</li>
              <li>✓ Weighted Scoring Algorithm</li>
              <li>✓ Sales Opportunity Detection</li>
              <li>✓ Speaker Diarization</li>
              <li>✓ Performance Metrics</li>
              <li>✓ Actionable Recommendations</li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 mb-6" />
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>Generated on {new Date(analyzedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/DianaTao/service-call-analyzer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <FaGithub className="text-lg" />
              <span>View on GitHub</span>
            </a>
            
            <div className="text-gray-500">
              Built with ❤️ for analysis excellence
            </div>
          </div>
        </div>
        
        {/* Attribution */}
        <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-500 text-center">
          <p>
            Powered by <a href="https://www.assemblyai.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">AssemblyAI</a> for transcription • 
            Custom analysis algorithms for compliance scoring • 
            Designed for service call optimization
          </p>
        </div>
      </div>
    </footer>
  );
};

