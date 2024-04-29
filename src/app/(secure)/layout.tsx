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
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeProvider>
  );
}
