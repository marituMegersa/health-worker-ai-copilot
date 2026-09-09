import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Health Worker AI Copilot | Clinical Triage & NGO Analytics',
  description: 'AI-powered clinical decision support, patient intake, and disease surveillance platform for NGOs, clinics, and government health programs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 min-h-screen text-slate-900`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-2">
            <p className="font-medium text-slate-300">Health Worker AI Copilot Platform • Designed for Low-Resource Health Settings</p>
            <p>Aligned with WHO IMCI, ANC & CDC Clinical Practice Guidelines • Supporting NGOs & Public Health Initiatives</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
