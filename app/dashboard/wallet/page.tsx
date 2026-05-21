// app/dashboard/wallet/page.tsx
'use client';

import { useState } from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, Plus, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const TRANSACTIONS = [
  { id: '1', type: 'DEPOSIT',    amount: 10000, status: 'COMPLETED', date: new Date(Date.now() - 86400000),  label: 'Dépôt CinetPay' },
  { id: '2', type: 'BET_PLACED', amount: -2000, status: 'COMPLETED', date: new Date(Date.now() - 80000000),  label: 'Pari PSG vs OM' },
  { id: '3', type: 'BET_WON',    amount: 4200,  status: 'COMPLETED', date: new Date(Date.now() - 70000000),  label: 'Gain PSG vs OM' },
  { id: '4', type: 'BET_PLACED', amount: -1000, status: 'COMPLETED', date: new Date(Date.now() - 172800000), label: 'Pari Combiné x3' },
  { id: '5', type: 'WITHDRAWAL', amount: -5000, status: 'COMPLETED', date: new Date(Date.now() - 259200000), label: 'Retrait Mobile Money' },
];

const TYPE_CONFIG: Record<string, { color: string; icon: any; sign: string }> = {
  DEPOSIT:    { color: 'text-success', icon: ArrowDownLeft, sign: '+' },
  BET_WON:    { color: 'text-success', icon: ArrowDownLeft, sign: '+' },
  BET_PLACED: { color: 'text-danger',  icon: ArrowUpRight,  sign: ''  },
  WITHDRAWAL: { color: 'text-danger',  icon: ArrowUpRight,  sign: ''  },
  BET_REFUND: { color: 'text-info',    icon: ArrowDownLeft, sign: '+' },
};

export default function WalletPage() {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  const balance = TRANSACTIONS.reduce((acc, t) => acc + t.amount, 0);

  const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 25000, 50000];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Wallet className="w-6 h-6 text-brand-400" />
        <h1 className="font-display font-extrabold text-2xl">Portefeuille</h1>
      </div>

      {/* Solde */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />
        <div className="relative">
          <p className="text-dark-400 text-sm mb-1">Solde disponible</p>
          <p className="font-display font-extrabold text-4xl text-brand-400">
            {formatCurrency(balance)}
          </p>
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-success text-sm font-bold">
                +{formatCurrency(TRANSACTIONS.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0))}
              </p>
              <p className="text-dark-400 text-xs">Total entrant</p>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <p className="text-danger text-sm font-bold">
                {formatCurrency(Math.abs(TRANSACTIONS.filter(t => t.amount < 0).reduce((a, t) => a + t.amount, 0)))}
              </p>
              <p className="text-dark-400 text-xs">Total sortant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dépôt / Retrait */}
      <div className="card p-5">
        {/* Tabs */}
        <div className="flex gap-2 mb-5 bg-dark-950 p-1 rounded-xl">
          {(['deposit', 'withdraw'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? 'bg-brand-500 text-dark-950'
                  : 'text-dark-400 hover:text-white'
              }`}>
              {t === 'deposit' ? '💰 Déposer' : '📤 Retirer'}
            </button>
          ))}
        </div>

        {/* Montants rapides */}
        <p className="text-xs text-dark-400 mb-2">Montant rapide (XOF)</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {QUICK_AMOUNTS.map(a => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className={`py-2 rounded-xl text-sm font-semibold border transition-all ${
                amount === String(a)
                  ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                  : 'bg-dark-900 border-white/10 text-dark-300 hover:border-brand-500/40'
              }`}>
              {formatCurrency(a)}
            </button>
          ))}
        </div>

        {/* Input montant */}
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Ou entrez un montant personnalisé"
          className="input mb-4"
        />

        {/* Méthodes de paiement */}
        <p className="text-xs text-dark-400 mb-2">Méthode de paiement</p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { name: 'MTN Mobile Money', emoji: '📱' },
            { name: 'Orange Money',     emoji: '🟠' },
            { name: 'CinetPay',         emoji: '💳' },
            { name: 'Wave',             emoji: '🌊' },
          ].map(m => (
            <div key={m.name}
              className="flex items-center gap-2 p-3 rounded-xl bg-dark-900
                         border border-white/10 hover:border-brand-500/40
                         cursor-pointer transition-all text-sm">
              <span>{m.emoji}</span>
              <span className="text-dark-200">{m.name}</span>
            </div>
          ))}
        </div>

        <button
          disabled={!amount}
          className="btn-primary w-full py-3.5 disabled:opacity-50">
          <CreditCard className="w-4 h-4" />
          {tab === 'deposit' ? 'Déposer maintenant' : 'Retirer maintenant'}
        </button>
      </div>

      {/* Transactions */}
      <div className="card p-5">
        <h2 className="font-display font-bold text-lg mb-4">Transactions récentes</h2>
        <div className="space-y-3">
          {TRANSACTIONS.map(t => {
            const cfg = TYPE_CONFIG[t.type];
            const Icon = cfg.icon;
            return (
              <div key={t.id} className="flex items-center justify-between py-2
                                          border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                                   ${t.amount > 0 ? 'bg-success/10' : 'bg-danger/10'}`}>
                    <Icon className={`w-4 h-4 ${cfg.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs text-dark-400">
                      {new Date(t.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <span className={`font-display font-bold text-sm ${cfg.color}`}>
                  {cfg.sign}{formatCurrency(Math.abs(t.amount))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}