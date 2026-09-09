'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Stethoscope, Users, BarChart3, Package, HeartPulse, Globe, UserCheck, WifiOff } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '@/lib/i18n/translations';

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [role, setRole] = useState<'HEW' | 'Nurse' | 'Midwife' | 'HealthOfficer' | 'Admin'>('HEW');

  const t = TRANSLATIONS[lang];

  const navItems = [
    { label: t.triageTitle.split(' ')[0] || 'Overview', href: '/', icon: HeartPulse },
    { label: t.triageTitle, href: '/triage', icon: Stethoscope },
    { label: t.patientsTitle, href: '/patients', icon: Users },
    { label: t.analyticsTitle, href: '/analytics', icon: BarChart3 },
    { label: t.suppliesTitle, href: '/supplies', icon: Package },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="p-2 bg-teal-500 rounded-lg group-hover:bg-teal-400 transition-colors">
              <Stethoscope className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg text-white tracking-wide flex items-center gap-2">
                Ethiopian Health <span className="text-teal-400 font-extrabold">AI Copilot</span>
              </span>
              <span className="text-[11px] text-slate-400 block -mt-1 hidden sm:block">
                Ethiopian MoH • HEWs, Nurses & Midwives
              </span>
            </div>
          </Link>

          {/* Main Navigation Links */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
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

          {/* Controls: Language Selector & Role Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-teal-400 ml-1" />
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  lang === 'en' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('am')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  lang === 'am' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                አማ
              </button>
              <button
                onClick={() => setLang('om')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  lang === 'om' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                OM
              </button>
            </div>

            {/* Role Switcher Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer"
              >
                <option value="HEW" className="bg-slate-900 text-white">{t.roleHEW}</option>
                <option value="Nurse" className="bg-slate-900 text-white">{t.roleNurse}</option>
                <option value="Midwife" className="bg-slate-900 text-white">{t.roleMidwife}</option>
                <option value="HealthOfficer" className="bg-slate-900 text-white">{t.roleHealthOfficer}</option>
                <option value="Admin" className="bg-slate-900 text-white">{t.roleAdmin}</option>
              </select>
            </div>

            {/* Offline Sync Outbox Status */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 border border-emerald-700/60 rounded-lg text-[11px] font-bold text-emerald-300">
              <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Offline Engine Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex overflow-x-auto border-t border-slate-800 bg-slate-900 px-2 py-2 space-x-2">
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
