import React from "react";

const PageLoader = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-6 backdrop-blur-md">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-sm text-gray-600 font-medium tracking-wide">Loading</p>
    </div>
  );
};

export default PageLoader;
