// components/layout/TopBar.tsx
'use client';

import { Bell, Plus, ShoppingCart } from 'lucide-react';
import { useBetslipStore } from '@/lib/store/betslip.store';
import { formatCurrency } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';

interface TopBarProps {
  user: User;
}

export default function TopBar({ user }: TopBarProps) {
  const selections = useBetslipStore(s => s.selections);

  return (
    <header className="glass z-40 h-16 flex items-center justify-between px-4 sm:px-6 shrink-0">
      {/* Page title area (mobile: logo) */}
      <div className="md:hidden flex items-center gap-2">
        <span className="text-xl">🏆</span>
        <span className="font-display font-800 text-lg text-gradient">BetZone</span>
      </div>
      <div className="hidden md:block" /> {/* Spacer on desktop */}

      {/* Right cluster */}
      <div className="flex items-center gap-3">
        {/* Wallet balance */}
        <div className="hidden sm:flex items-center gap-2 card px-3 py-1.5">
          <span className="text-dark-300 text-xs">Solde</span>
          <span className="font-display font-700 text-brand-400 text-sm">
            {formatCurrency(0)}
          </span>
          <button className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center
                             hover:bg-brand-500/40 transition-colors ml-1">
            <Plus className="w-3 h-3 text-brand-400" />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-dark-800 flex items-center justify-center
                           border border-white/5 hover:border-brand-500/20 transition-colors">
          <Bell className="w-4 h-4 text-dark-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
        </button>

        {/* Betslip toggle */}
        <button className="relative w-9 h-9 rounded-xl bg-dark-800 flex items-center justify-center
                           border border-white/5 hover:border-brand-500/20 transition-colors md:hidden">
          <ShoppingCart className="w-4 h-4 text-dark-300" />
          {selections.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500
                             text-dark-950 text-[10px] font-800 flex items-center justify-center">
              {selections.length}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center
                        font-display font-700 text-dark-950 text-sm cursor-pointer">
          {(user.user_metadata?.username?.[0] ?? user.email?.[0] ?? 'U').toUpperCase()}
        </div>
      </div>
    </header>
  );
}
