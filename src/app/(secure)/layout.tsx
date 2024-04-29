import Header from '@/components/header/header';
import {ThemeProvider} from '@/components/theme-provider/ThemeProvider';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '[5] Tailo - Your App',
  description: '',
};

export default function SecureLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <main>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <Header />

        {children}
      </ThemeProvider>
    </main>
  );
}
