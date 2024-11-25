import type { Metadata } from 'next';
import './globals.css';
import FullApp from '@/components/appWrapper/FullApp';

export const metadata: Metadata = {
  title: 'Socialize',
  description: 'a nextjs social media app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`antialiased min-h-screen text-slate-50 bg-black`}>
        <FullApp>{children}</FullApp>
      </body>
    </html>
  );
}
