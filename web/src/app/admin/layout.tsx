import type { Metadata } from 'next';
import '@/app/globals.css';
import { AuthProvider } from './lib/auth';

export const metadata: Metadata = {
  title: 'Blog for Admin',
  description: 'For admin to tweak main blog site',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthProvider>{children}</AuthProvider>;
}
