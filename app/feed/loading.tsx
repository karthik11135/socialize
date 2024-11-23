import React from 'react';
import { IoReloadOutline } from 'react-icons/io5';

const loading = () => {
  return (
    <div className="mx-10 my-6">
    <div
      className="mb-4 h-8 rounded-md animate-pulse bg-zinc-800 opacity-75 border placeholder:font-bold focus:outline-1 focus:border-neutral-400 border-neutral-800"
    />
    <div className="grid grid-cols-3 gap-5">
      {/* <IoReloadOutline className="animate-spin m-10 mx-auto" /> */}
      {[2, 3, 3, 4, 4]?.map((post, ind) => {
        return <div className='w-full h-40 rounded-md animate-pulse bg-zinc-800' />;
      })}
    </div>
  </div>
  );
};

export default loading;
