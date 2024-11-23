import React from 'react';
import { IoReloadOutline } from 'react-icons/io5';

const loading = () => {
  return (
    <div className="w-3/6 animate-pulse mt-5 mx-auto">
      <div className="flex items-center gap-5 mb-6">
        <div className="bg-zinc-800 w-8 h-8 rounded-full"></div>
        <h1 className="text-3xl h-8 w-full rounded-md bg-zinc-800"> </h1>
      </div>
      <div defaultValue="myposts" className="">
        <div className="grid w-full bg-zinc-800 h-6 rounded-md border border-neutral-800 text-slate-50 grid-cols-2">
          <div></div>
          <div></div>
        </div>
        <div>
          {[2, 24, 4, 2]?.map(() => {
            return (
              <div className="relative">
                <div className="bg-zinc-800 rounded-md w-full h-40 my-3" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default loading;
