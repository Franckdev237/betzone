// components/betting/Betslip.tsx
'use client';

import { useState } from 'react';
import { X, Trash2, ChevronUp, Loader2 } from 'lucide-react';
import { useBetslipStore } from '@/lib/store/betslip.store';
import { formatCurrency, formatOdds, cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Betslip() {
  const {
    selections, stake, removeSelection,
    clearSlip, setStake, totalOdds, potentialWin,
  } = useBetslipStore();

  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlaceBet = async () => {
    if (!stake || stake <= 0) {
      toast.error('Entrez un montant à miser');
      return;
    }
    if (selections.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selections: selections.map(s => ({
            outcomeId: s.outcomeId,
            odds: s.odds,
          })),
          stake,
          type: selections.length === 1 ? 'SINGLE' : 'COMBINED',
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      toast.success('Pari placé avec succès !');
      clearSlip();
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors du placement');
    } finally {
      setLoading(false);
    }
  };

  // ── Version mobile collapsible ──────────────
  return (
    <>
      {/* Trigger mobile */}
      {selections.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-full bg-brand-500 text-dark-950 py-4 px-6 flex items-center justify-between font-display font-700">
            <span>🎯 Mon coupon ({selections.length})</span>
            <div className="flex items-center gap-2">
              <span>{formatOdds(totalOdds())}</span>
              <ChevronUp className={cn('w-4 h-4 transition-transform', open && 'rotate-180')} />
            </div>
          </button>
        </div>
      )}

      {/* Panel */}
      <aside className={cn(
        'fixed md:relative z-50 md:z-auto',
        'w-full md:w-80 bg-dark-900 border-l border-white/5',
        'flex flex-col shrink-0',
        // Mobile: slide from bottom
        'md:translate-y-0 transition-transform duration-300',
        'inset-x-0 bottom-0 top-auto md:top-0 md:inset-auto md:h-full',
        open ? 'translate-y-0' : 'translate-y-full md:translate-y-0',
        'max-h-[80vh] md:max-h-full',
      )}>
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h2 className="font-display font-700">Mon coupon</h2>
            {selections.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-500 text-dark-950
                               text-xs font-800 flex items-center justify-center">
                {selections.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selections.length > 0 && (
              <button
                onClick={clearSlip}
                className="text-dark-400 hover:text-danger transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-dark-400 hover:text-white transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sélections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selections.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">⚽</div>
              <p className="text-dark-400 text-sm">
                Cliquez sur une cote pour ajouter votre sélection
              </p>
            </div>
          ) : (
            selections.map(s => (
              <div key={s.outcomeId} className="card p-3 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-dark-400 truncate">{s.eventName}</div>
                  <div className="text-sm font-600 mt-0.5">{s.outcomeName}</div>
                  <div className="text-xs text-dark-300 mt-0.5">{s.marketName}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-display font-700 text-brand-400 text-sm">
                    {formatOdds(s.odds)}
                  </span>
                  <button
                    onClick={() => removeSelection(s.outcomeId)}
                    className="text-dark-500 hover:text-danger transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (mise + validation) */}
        {selections.length > 0 && (
          <div className="p-4 border-t border-white/5 space-y-3 shrink-0">
            {/* Cote totale */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-300">Cote totale</span>
              <span className="font-display font-700 text-brand-400">
                {formatOdds(totalOdds())}
              </span>
            </div>

            {/* Montant */}
            <div>
              <label className="text-xs text-dark-400 mb-1.5 block">Mise (XOF)</label>
              <input
                type="number"
                min="100"
                step="100"
                value={stake || ''}
                onChange={e => setStake(Number(e.target.value))}
                placeholder="Ex: 1000"
                className="input text-center font-display font-700"
              />
            </div>

            {/* Gain potentiel */}
            {stake > 0 && (
              <div className="card bg-success/5 border-success/20 p-3 flex items-center justify-between">
                <span className="text-sm text-dark-300">Gain potentiel</span>
                <span className="font-display font-800 text-success text-lg">
                  {formatCurrency(potentialWin())}
                </span>
              </div>
            )}

            {/* Bouton parier */}
            <button
              onClick={handlePlaceBet}
              disabled={loading || !stake}
              className="btn-primary w-full py-3.5">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Validation...' : 'Parier maintenant'}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
