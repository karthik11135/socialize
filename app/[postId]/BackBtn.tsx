'use client';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const BackBtn = () => {
  const router = useRouter();

  return (
    <span className="mb-0.5 cursor-pointer p-2">
      <FaAngleLeft
        onClick={() => {
          router.push('/feed');
        }}
        color="white"
        size={25}
      />
    </span>
  );
};

export default BackBtn;
