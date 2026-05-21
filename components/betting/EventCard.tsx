// components/betting/EventCard.tsx
'use client';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useBetslipStore } from '@/lib/store/betslip.store';
import { formatOdds, cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Outcome {
  id: string;
  label: string;
  odds: number;
}

interface Market {
  id: string;
  name: string;
  outcomes: Outcome[];
}

interface Event {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startAt: Date | string;
  status: string;
  competition: { name: string; sport: { name: string } };
  markets: Market[];
}

export default function EventCard({ event }: { event: Event }) {
  const { addSelection, removeSelection, selections } = useBetslipStore();
  const market = event.markets[0];
  const isLive = event.status === 'LIVE';
  const startAt = new Date(event.startAt);

  const isSelected = (outcomeId: string) =>
    selections.some(s => s.outcomeId === outcomeId);

  const toggleOutcome = (outcome: Outcome) => {
    if (isSelected(outcome.id)) {
      removeSelection(outcome.id);
    } else {
      addSelection({
        outcomeId:   outcome.id,
        eventId:     event.id,
        eventName:   `${event.homeTeam} vs ${event.awayTeam}`,
        marketName:  market?.name ?? 'Résultat',
        outcomeName: outcome.label,
        odds:        outcome.odds,
      });
    }
  };

  return (
    <div className="card-hover p-4 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-dark-400 truncate">
            {event.competition.sport.name} · {event.competition.name}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isLive ? (
            <span className="badge-live">
              <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="badge-upcoming">
              {format(startAt, 'HH:mm', { locale: fr })}
            </span>
          )}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {/* Home */}
            <div className="flex flex-col items-center gap-1 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-dark-900 border border-white/8
                              flex items-center justify-center text-lg">⚽</div>
              <span className="font-display font-700 text-sm truncate max-w-[80px]">
                {event.homeTeam}
              </span>
            </div>

            {/* Séparateur */}
            <div className="flex-1 text-center">
              <div className="text-dark-500 text-xs font-600">VS</div>
              {isLive && (
                <div className="text-danger text-xs font-700 mt-0.5">
                  {Math.floor(Math.random() * 45 + 1)}'{' '}
                </div>
              )}
            </div>

            {/* Away */}
            <div className="flex flex-col items-center gap-1 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-dark-900 border border-white/8
                              flex items-center justify-center text-lg">⚽</div>
              <span className="font-display font-700 text-sm truncate max-w-[80px]">
                {event.awayTeam}
              </span>
            </div>
          </div>
        </div>

        {/* More markets */}
        <button className="flex items-center gap-1 text-xs text-dark-400
                           hover:text-brand-400 transition-colors ml-4 shrink-0">
          +12 <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Cotes */}
      {market && (
        <div className={cn(
          'grid gap-2',
          market.outcomes.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
        )}>
          {market.outcomes.map(outcome => (
            <button
              key={outcome.id}
              onClick={() => toggleOutcome(outcome)}
              className={cn('odds-btn', isSelected(outcome.id) && 'selected')}
            >
              <span className="text-dark-300 text-xs mb-0.5">{outcome.label}</span>
              <span className={cn(
                'font-display font-700 text-base transition-colors',
                isSelected(outcome.id) ? 'text-brand-400' : 'text-white'
              )}>
                {formatOdds(outcome.odds)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
