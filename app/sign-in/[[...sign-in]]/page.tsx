import React from 'react';
import { SignIn } from '@clerk/nextjs';

const page = () => {
  return (
    <div className="mx-auto mt-10 w-fit">
      <SignIn />
    </div>
  );
};

export default page;
