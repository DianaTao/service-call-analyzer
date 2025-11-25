import React, { useState } from 'react';
import { FaUser, FaUserTie } from 'react-icons/fa';
import type { Transcript } from '../types';

interface TranscriptViewerProps {
  transcript: Transcript;
}

export const TranscriptViewer: React.FC<TranscriptViewerProps> = ({ transcript }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUtterances = transcript.utterances.filter((u) =>
    u.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">📝 Call Transcript</h2>
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredUtterances.map((utterance) => {
          const isTechnician = utterance.speakerLabel === 'Technician';
          return (
            <div
              key={utterance.id}
              className={`p-4 rounded-lg ${
                isTechnician ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50 border-l-4 border-gray-400'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-xl ${isTechnician ? 'text-blue-600' : 'text-gray-600'}`}>
                  {isTechnician ? <FaUserTie /> : <FaUser />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${isTechnician ? 'text-blue-700' : 'text-gray-700'}`}>
                      {utterance.speakerLabel}
                    </span>
                    <span className="text-xs text-gray-500">
                      {utterance.startTime}
                    </span>
                    <span className="text-xs text-gray-400">
                      (confidence: {Math.round(utterance.confidence * 100)}%)
                    </span>
                  </div>
                  <p className="text-gray-700">{utterance.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUtterances.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No matching utterances found.
        </div>
      )}
    </div>
  );
};

