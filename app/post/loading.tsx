import React from 'react';

const loading = () => {
  return (
    <div className="animate-pulse">
      <div className="w-3/6 mt-20 rounded-md mx-auto mb-4 h-10 bg-neutral-800"></div>
      <div className="w-3/6 mt rounded-md h-60 overflow-auto bg-neutral-800 text-slate-50 border-neutral-700 mx-auto">
        <div className="h-7 bg-neutral-700 m-3 my-2 rounded w-2/6 "></div>
        <div className="h-32 bg-neutral-700 m-3 my-2 rounded w-4/6 "></div>
      </div>
    </div>
  );
};

export default loading;
