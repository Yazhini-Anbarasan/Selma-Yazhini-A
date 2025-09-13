
import React from 'react';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="text-center p-8 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700 animate-fade-in">
      <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        Ready to Predict Your Age?
      </h1>
      <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
        Our advanced AI will analyze your photo to estimate your age. For the best results, please follow these guidelines.
      </p>

      <div className="grid md:grid-cols-2 gap-6 text-left mb-10 max-w-3xl mx-auto">
        <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
          <h3 className="font-bold text-xl mb-3 text-cyan-300 flex items-center gap-2">
            <CheckIcon /> Do's
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>✓ Use a clear, front-facing photo.</li>
            <li>✓ Ensure good, even lighting.</li>
            <li>✓ Keep a neutral facial expression.</li>
            <li>✓ Only one person should be in the photo.</li>
          </ul>
        </div>
        <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
          <h3 className="font-bold text-xl mb-3 text-rose-400 flex items-center gap-2">
            <CrossIcon /> Don'ts
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>✗ Avoid heavy makeup or accessories.</li>
            <li>✗ No blurry or low-resolution images.</li>
            <li>✗ Don't wear hats or sunglasses.</li>
            <li>✗ Avoid photos with strong shadows.</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onStart}
        className="bg-indigo-600 text-white font-bold text-xl py-4 px-10 rounded-full hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/30"
      >
        Get Started
      </button>
    </div>
  );
};

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CrossIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export default WelcomePage;
