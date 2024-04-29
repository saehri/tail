import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '[5] Tailo - Your App',
  description: '',
};

import Header from '@/components/header/header';

export default function SecureLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <main>
      <Header />

      {children}
    </main>
  );
}
