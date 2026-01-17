import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'WellPass Management System',
  description: 'Employee health and wellness management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1F2937',
                color: '#fff',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              },
              success: {
                style: {
                  background: '#059669',
                },
              },
              error: {
                style: {
                  background: '#DC2626',
                },
              },
              loading: {
                style: {
                  background: '#3B82F6',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}