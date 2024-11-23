import React from 'react';
import ProfilePage from '@/components/profile/ProfilePage';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  return (
    <div>
      <ProfilePage userId={userId} />
    </div>
  );
};

export default page;
