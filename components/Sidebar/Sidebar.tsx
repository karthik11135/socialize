'use client';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import SidebarItems from './SidebarItems';
import { storeUserIdAction } from '@/actions/userActions';

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();

  const handleUserIdStorage = async (userId: string) => {
    await storeUserIdAction(userId);
  };

  useEffect(() => {
    if (userId) {
      handleUserIdStorage(userId);
    }
  }, [userId]);

  return (
    <div className="grid grid-cols-12">
      <SidebarItems />
      <div className="col-span-10 overflow-scroll h-screen">{children}</div>
    </div>
  );
};

export default SidebarWrapper;
