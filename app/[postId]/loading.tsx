import React from 'react';

const loading = () => {
  return (
    <div className="w-4/6 mx-auto mt-5">
      <div className="h-10 w-10 mb-4 bg-neutral-800 rounded-full"></div>
      <div className="h-60 mb-4 bg-neutral-800 rounded-md"></div>
      <div className="flex gap-2">
        <div className="w-5/6 h-8 rounded bg-neutral-800"></div>
        <div className="w-1/6 h-8 rounded bg-neutral-800"></div>
      </div>
    </div>
  );
};

export default loading;
