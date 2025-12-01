import type { Metadata } from 'next';
import './globals.css';
import Layout from '../components/Layout';

export const metadata: Metadata = {
  title: 'Your Site Name',
  description: 'Description of your site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}