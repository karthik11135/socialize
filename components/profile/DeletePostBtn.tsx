'use client';
import { deletePostByIdAction } from '@/actions/postActions';
import React, { useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { IoReloadOutline } from 'react-icons/io5';

const DeletePostBtn = ({ postId }: { postId: number }) => {
  const [loading, setLoading] = useState(false);
  const deletePostHandler = async () => {
    setLoading(true);
    const res = await deletePostByIdAction(postId);
    if (res?.ok) setLoading(false);
  };

  return (
    <div className="absolute flex gap-2 items-center z-10 top-0 -right-20 text-slate-50 font-bold ">
      <FaArrowLeftLong size={20} />
      <button
        disabled={loading}
        onClick={deletePostHandler}
        className="text-red-900 px-2 py-0.5 hover:bg-red-400 rounded cursor-pointer border-none bg-red-300"
      >
        {loading ? <IoReloadOutline className="animate-spin" /> : 'del'}
      </button>
    </div>
  );
};

export default DeletePostBtn;
