import type {Metadata} from 'next';
import {Karla} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider/ThemeProvider';

const karla = Karla({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Tailo - Uni Life Tracker',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={karla.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
