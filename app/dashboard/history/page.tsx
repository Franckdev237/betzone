// app/dashboard/history/page.tsx
'use client';

import { History, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { formatCurrency, formatOdds } from '@/lib/utils';

const DEMO_BETS = [
  {
    id: '1', type: 'SINGLE', stake: 2000, totalOdds: 2.10,
    potentialWin: 4200, status: 'WON', createdAt: new Date(Date.now() - 86400000),
    items: [{ event: 'PSG vs OM', market: 'Résultat Final', outcome: '1', odds: 2.10 }],
  },
  {
    id: '2', type: 'COMBINED', stake: 1000, totalOdds: 6.50,
    potentialWin: 6500, status: 'LOST', createdAt: new Date(Date.now() - 172800000),
    items: [
      { event: 'Man City vs Arsenal', market: 'Résultat Final', outcome: '1', odds: 1.65 },
      { event: 'Bayern vs Dortmund',  market: 'Résultat Final', outcome: '1', odds: 1.55 },
      { event: 'Juventus vs Milan',   market: 'Résultat Final', outcome: 'X', odds: 3.20 },
    ],
  },
  {
    id: '3', type: 'SINGLE', stake: 5000, totalOdds: 1.85,
    potentialWin: 9250, status: 'PENDING', createdAt: new Date(Date.now() - 3600000),
    items: [{ event: 'Real Madrid vs Barcelona', market: 'Résultat Final', outcome: 'X', odds: 3.20 }],
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  WON:     { label: 'Gagné',    color: 'text-success bg-success/10 border-success/20',   icon: TrendingUp },
  LOST:    { label: 'Perdu',    color: 'text-danger  bg-danger/10  border-danger/20',    icon: TrendingDown },
  PENDING: { label: 'En cours', color: 'text-brand-400 bg-brand-500/10 border-brand-500/20', icon: Clock },
};

export default function HistoryPage() {
  const won  = DEMO_BETS.filter(b => b.status === 'WON').reduce((a, b) => a + b.potentialWin - b.stake, 0);
  const lost = DEMO_BETS.filter(b => b.status === 'LOST').reduce((a, b) => a + b.stake, 0);

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <History className="w-6 h-6 text-brand-400" />
        <h1 className="font-display font-extrabold text-2xl">Historique</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Paris joués',  value: DEMO_BETS.length,         color: 'text-white' },
          { label: 'Gains nets',   value: formatCurrency(won),       color: 'text-success' },
          { label: 'Pertes',       value: formatCurrency(lost),      color: 'text-danger' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <div className={`font-display font-extrabold text-xl ${s.color}`}>{s.value}</div>
            <div className="text-dark-400 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Liste des paris */}
      <div className="space-y-4">
        {DEMO_BETS.map(bet => {
          const cfg = STATUS_CONFIG[bet.status];
          const Icon = cfg.icon;
          return (
            <div key={bet.id} className="card p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-dark-400">
                    {bet.type === 'SINGLE' ? 'Simple' : `Combiné (${bet.items.length} sélections)`}
                  </span>
                  <span className="text-dark-600">·</span>
                  <span className="text-xs text-dark-400">
                    {new Date(bet.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
                  <Icon className="w-3 h-3" />
                  {cfg.label}
                </span>
              </div>

              {/* Sélections */}
              <div className="space-y-2 mb-4">
                {bet.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-dark-900 rounded-xl px-3 py-2">
                    <div>
                      <div className="text-sm font-medium">{item.event}</div>
                      <div className="text-xs text-dark-400">{item.market} · {item.outcome}</div>
                    </div>
                    <span className="font-display font-bold text-brand-400 text-sm">
                      {formatOdds(item.odds)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-sm">
                <div className="text-dark-400">
                  Mise : <span className="text-white font-semibold">{formatCurrency(bet.stake)}</span>
                  <span className="mx-2 text-dark-600">·</span>
                  Cote : <span className="text-brand-400 font-bold">{formatOdds(bet.totalOdds)}</span>
                </div>
                <div className={bet.status === 'WON' ? 'text-success font-bold' : 'text-dark-300'}>
                  {bet.status === 'WON' ? '+' : ''}{formatCurrency(
                    bet.status === 'WON' ? bet.potentialWin - bet.stake :
                    bet.status === 'LOST' ? -bet.stake : bet.potentialWin
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}