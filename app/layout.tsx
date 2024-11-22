import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/utils/Provider';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/ui/Navbar';
import { auth } from '@clerk/nextjs/server';
import SidebarWrapper from '@/components/Sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Socialize',
  description: 'a nextjs social media app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <html lang="en">
      <ClerkProvider
        dynamic
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <body className={`antialiased min-h-screen text-slate-50 bg-black`}>
          <Navbar />
          {userId && <SidebarWrapper>{children}</SidebarWrapper>}
          {!userId && (
            <div className="text-center text-slate-50">{children}</div>
          )}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
