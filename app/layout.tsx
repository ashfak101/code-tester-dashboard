import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from 'next/script';

import { Providers } from '@/app/providers';
import Header from '@/components/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next js App ',
  description: 'Created by Next.js',
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>

        {/* This script ensures Monaco Editor's workers are properly initialized */}
        <Script id='monaco-environment' strategy='beforeInteractive'>
          {`
            self.MonacoEnvironment = {
              getWorkerUrl: function (_, label) {
                return '/_next/static/chunks/monaco/' +
                  (label === 'json' ? 'json.worker.js' :
                  label === 'css' || label === 'scss' || label === 'less' ? 'css.worker.js' :
                  label === 'html' || label === 'handlebars' || label === 'razor' ? 'html.worker.js' :
                  label === 'typescript' || label === 'javascript' ? 'ts.worker.js' :
                  'editor.worker.js');
              }
            };
          `}
        </Script>
      </body>
    </html>
  );
}
