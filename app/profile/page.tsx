import React from 'react';
import ProfilePage from '@/components/profile/ProfilePage';
import { auth } from '@clerk/nextjs/server';

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <p>First login bruh</p>;
  }

  return (
    <div>
      <ProfilePage userId={userId} />
    </div>
  );
};

export default page;
