// import { Signup } from '@/components/auth/Signup';
import { SignUp } from '@clerk/nextjs';

import React from 'react';

const page = () => {
  return <div className='mx-auto mt-10 w-fit'>
     <SignUp />
  </div>
};

export default page;
