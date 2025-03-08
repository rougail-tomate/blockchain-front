import React from 'react';

const CircularLoader = () => {
  return (
    <div className="flex">
        <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default CircularLoader;