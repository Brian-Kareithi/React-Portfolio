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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]">
      <div className="flex justify-center items-center">
        <svg className="w-12 h-12 animate-spin" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="white"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100 200"
          />
        </svg>
      </div>
    </div>
  );
};

export default LoadingScreen;