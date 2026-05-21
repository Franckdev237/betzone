// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Trophy, Tv2, History,
  Wallet, Settings, LogOut, Users,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard',          label: 'Accueil',     icon: LayoutDashboard },
  { href: '/dashboard/sports',   label: 'Sports',      icon: Trophy },
  { href: '/dashboard/live',     label: 'En direct',   icon: Tv2 },
  { href: '/dashboard/history',  label: 'Historique',  icon: History },
  { href: '/dashboard/wallet',   label: 'Portefeuille', icon: Wallet },
];

const BOTTOM_NAV = [
  { href: '/dashboard/settings', label: 'Paramètres',  icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-dark-900 border-r border-white/5 h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <span className="font-display font-800 text-xl text-gradient">BetZone</span>
        </Link>
      </div>

      {/* Nav principale */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn('nav-link', pathname === href && 'active')}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="text-sm font-500">{label}</span>
          </Link>
        ))}
      </nav>

      {/* Nav bas */}
      <div className="p-4 border-t border-white/5 space-y-1">
        {BOTTOM_NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn('nav-link', pathname === href && 'active')}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="text-sm font-500">{label}</span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="nav-link w-full text-left text-danger/80 hover:text-danger hover:bg-danger/5"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="text-sm font-500">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
