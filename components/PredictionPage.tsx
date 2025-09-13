
import React, { useState, useRef, useCallback } from 'react';
import { predictAgeFromImage } from '../services/geminiService';
import { PredictionResult, ImageFile } from '../types';

interface PredictionPageProps {
  onPredictionMade: (image: string, result: PredictionResult) => void;
  onFeedbackRequest: () => void;
  onReset: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error' | 'confirmed';

const PredictionPage: React.FC<PredictionPageProps> = ({ onPredictionMade, onFeedbackRequest, onReset }) => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = (e.target?.result as string).split(',')[1];
        setImageFile({ base64: base64String, mimeType: file.type });
        setStatus('loading');
        handleSubmit({ base64: base64String, mimeType: file.type });
      };
      reader.onerror = () => {
        setStatus('error');
        setError("Failed to read the file.");
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = useCallback(async (file: ImageFile) => {
    setError(null);
    try {
      const result = await predictAgeFromImage(file);
      setPrediction(result);
      onPredictionMade(`data:${file.mimeType};base64,${file.base64}`, result);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  }, [onPredictionMade]);
  
  const handleConfirmYes = () => {
      setStatus('confirmed');
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-400 mx-auto mb-4"></div>
            <p className="text-xl text-slate-300">Analyzing your image...</p>
            <p className="text-slate-400">This might take a moment.</p>
          </div>
        );
      case 'success':
        return (
           <div className="w-full flex flex-col md:flex-row items-center gap-8">
            <img src={`data:${imageFile?.mimeType};base64,${imageFile?.base64}`} alt="User upload" className="w-64 h-64 object-cover rounded-xl shadow-lg"/>
            <div className="text-center md:text-left">
                <p className="text-slate-400 text-lg">Our prediction is:</p>
                <h2 className="text-7xl font-bold my-2">{prediction?.age}</h2>
                <div className="w-full bg-slate-700 rounded-full h-4 mb-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${(prediction?.confidence ?? 0) * 100}%` }}></div>
                </div>
                <p className="text-slate-300 mb-6">Confidence: {((prediction?.confidence ?? 0) * 100).toFixed(1)}%</p>
                <p className="text-lg mb-4">Is this correct?</p>
                <div className="flex gap-4 justify-center md:justify-start">
                    <button onClick={handleConfirmYes} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition">Yes</button>
                    <button onClick={onFeedbackRequest} className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-500 transition">No</button>
                </div>
            </div>
           </div>
        );
      case 'confirmed':
        return (
            <div className="text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-400 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-3xl font-bold text-slate-100 mb-2">Awesome!</h3>
                <p className="text-slate-300 mb-6">Glad our AI got it right. Thanks for confirming!</p>
                <button onClick={onReset} className="text-indigo-400 hover:text-indigo-300 font-semibold transition">Start Over</button>
            </div>
        );
      case 'error':
        return (
          <div className="text-center text-rose-400">
            <h3 className="text-2xl font-bold mb-2">Something went wrong</h3>
            <p className="mb-4">{error}</p>
            <button onClick={() => fileInputRef.current?.click()} className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-500 transition">Try a different image</button>
          </div>
        );
      case 'idle':
      default:
        return (
          <div className="text-center">
            <button onClick={() => fileInputRef.current?.click()} className="w-full border-4 border-dashed border-slate-600 hover:border-indigo-500 hover:bg-slate-800/50 transition-all duration-300 rounded-2xl p-12 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xl font-semibold text-slate-300">Upload Image</span>
                <span className="text-slate-400 mt-1">Click here to select a photo</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700 p-8 min-h-[400px] flex items-center justify-center animate-fade-in">
      <input type="file" accept="image/png, image/jpeg, image/webp" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      {renderContent()}
    </div>
  );
};

export default PredictionPage;
