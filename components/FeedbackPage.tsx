
import React, { useState } from 'react';
import { AGE_RANGES } from '../constants';

interface FeedbackPageProps {
  onReset: () => void;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ onReset }) => {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSelectRange = (range: string) => {
    setSelectedRange(range);
    setIsConfirmed(false); // Reset confirmation if a new range is selected
  };
  
  const handleConfirmYes = () => {
    setIsConfirmed(true);
  };
  
  const handleConfirmNo = () => {
    setSelectedRange(null);
    setIsConfirmed(false);
  };

  if (isConfirmed) {
    return (
        <div className="bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700 p-8 text-center animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-cyan-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <h3 className="text-3xl font-bold text-slate-100 mb-2">Thank You!</h3>
            <p className="text-slate-300 mb-6">Your feedback is valuable and helps us improve our AI model.</p>
            <button onClick={onReset} className="text-indigo-400 hover:text-indigo-300 font-semibold transition">Start a New Prediction</button>
        </div>
    );
  }
  
  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700 p-8 text-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-2">Our apologies!</h2>
      <p className="text-slate-300 mb-6">
        Please help us improve by selecting the correct age range.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {AGE_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => handleSelectRange(range)}
            className={`p-4 rounded-lg font-semibold transition-all duration-200 text-lg ${
              selectedRange === range
                ? 'bg-indigo-600 text-white scale-105 shadow-lg shadow-indigo-600/30'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
      
      {selectedRange && (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 animate-fade-in-up">
            <p className="text-xl mb-4">You selected <span className="font-bold text-cyan-400">{selectedRange}</span>. Is this correct?</p>
            <div className="flex gap-4 justify-center">
                <button onClick={handleConfirmYes} className="bg-green-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-green-500 transition">Yes, it is</button>
                <button onClick={handleConfirmNo} className="bg-red-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-red-500 transition">No, let me change</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
