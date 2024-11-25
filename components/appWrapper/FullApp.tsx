import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navbar/Navbar';
import { auth } from '@clerk/nextjs/server';
import SidebarWrapper from '@/components/Sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';

const FullApp = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  
  return (
    <ClerkProvider
      dynamic
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Navbar />
      {userId && <SidebarWrapper>{children}</SidebarWrapper>}
      {!userId && <div className="text-center text-slate-50">{children}</div>}
      <Toaster />
    </ClerkProvider>
  );
};

export default FullApp;
