"use client";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">

        {/* Inner spinning dot */}
        <div className="absolute inset-0 m-auto w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;