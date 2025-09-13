
import React, { useState, useCallback } from 'react';
import WelcomePage from './components/WelcomePage';
import PredictionPage from './components/PredictionPage';
import FeedbackPage from './components/FeedbackPage';
import { Page, PredictionResult } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Welcome);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleStart = useCallback(() => {
    setCurrentPage(Page.Predict);
  }, []);

  const handlePredictionMade = useCallback((image: string, result: PredictionResult) => {
    setUploadedImage(image);
    setPrediction(result);
  }, []);

  const handleFeedbackRequest = useCallback(() => {
    setCurrentPage(Page.Feedback);
  }, []);
  
  const handleReset = useCallback(() => {
    setCurrentPage(Page.Welcome);
    setUploadedImage(null);
    setPrediction(null);
  }, []);


  const renderPage = () => {
    switch (currentPage) {
      case Page.Welcome:
        return <WelcomePage onStart={handleStart} />;
      case Page.Predict:
        return (
          <PredictionPage 
            onPredictionMade={handlePredictionMade} 
            onFeedbackRequest={handleFeedbackRequest}
            onReset={handleReset}
          />
        );
      case Page.Feedback:
        return <FeedbackPage onReset={handleReset} />;
      default:
        return <WelcomePage onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <header className="absolute top-0 left-0 p-6 flex items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-3.5h5v-2h-5v2zm0-3h5v-2h-5v2zm0-3h5v-2h-5v2z"/>
            </svg>
            <h1 className="text-2xl font-bold text-slate-200">Gemini Age Predictor</h1>
        </header>
        <main className="w-full max-w-4xl">
            {renderPage()}
        </main>
    </div>
  );
};

export default App;
