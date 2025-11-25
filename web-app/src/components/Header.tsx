import React from 'react';
import { FaPhone } from 'react-icons/fa';

interface HeaderProps {
  callType: string;
  duration: string;
  date: string;
}

export const Header: React.FC<HeaderProps> = ({ callType, duration, date }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-2">
          <FaPhone className="text-2xl" />
          <h1 className="text-3xl font-bold">Service Call Analysis Dashboard</h1>
        </div>
        <div className="flex gap-6 text-sm text-blue-100">
          <div>
            <span className="font-semibold">Call Type:</span> {callType}
          </div>
          <div>
            <span className="font-semibold">Duration:</span> {duration}
          </div>
          <div>
            <span className="font-semibold">Date:</span> {date}
          </div>
        </div>
      </div>
    </header>
  );
};

