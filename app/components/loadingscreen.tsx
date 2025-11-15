"use client";

import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-2000">
      <div className="text-center text-white">
        {/* Loading Text */}
        <h1 className="text-2xl font-light mb-8 text-white">
          Loading...
        </h1>

        {/* SVG Gradient Spinner */}
        <div className="flex justify-center items-center mb-2">
          <svg className="w-20 h-20 animate-spin-slow" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="blueWhiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#blueWhiteGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="100 200"
            />
          </svg>
        </div>

        {/* Subtle pulsing dots */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 1.8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;