'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, Users, BarChart3, Package, ShieldAlert, HeartPulse } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/', icon: HeartPulse },
    { label: 'AI Triage Copilot', href: '/triage', icon: Stethoscope },
    { label: 'Patients & Intake', href: '/patients', icon: Users },
    { label: 'NGO & Govt Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Supply Tracker', href: '/supplies', icon: Package },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-teal-500 rounded-lg group-hover:bg-teal-400 transition-colors">
              <Stethoscope className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-wide flex items-center gap-2">
                Health Worker <span className="text-teal-400 font-extrabold">AI Copilot</span>
              </span>
              <span className="text-xs text-slate-400 block -mt-1">
                NGOs • Rural Clinics • Govt Health Programs
              </span>
            </div>
          </Link>

          {/* Main Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Connectivity Status & Role Badge */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Offline-First Engine Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800 bg-slate-900 px-2 py-2 space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                isActive ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
