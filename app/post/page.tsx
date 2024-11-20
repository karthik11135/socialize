import React from 'react';
import { NewPost } from '@/components/posts/NewPost';
import { auth } from '@clerk/nextjs/server';

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <p className="text-center text-lg">First login</p>;
  }
  return (
    <div>
      <NewPost />
    </div>
  );
};

export default page;
