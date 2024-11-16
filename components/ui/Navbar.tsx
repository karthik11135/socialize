import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

const Navbar = async () => {
  // const { userId } = await auth();
  const userId = false

  console.log(userId)

  return (
    <div className=" w-full border-b  border-zinc-800 px-3 py-1  text-slate-100 mx-1 md:mx-auto">
      <div className="md:w-5/6 mx-auto flex">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
          Socialize
        </h1>
        <div className="ms-auto flex items-center space-x-3 pe-2">
          {!userId && (
            <>

              <Link
                href="/sign-in"
                className="px-3 hover:text-neutral-500 py-1"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-3 hover:text-neutral-500 py-1"
              >
                Signup
              </Link>
            </>
          )}
          {userId && <div className='flex items-center'>
            <UserButton />
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
