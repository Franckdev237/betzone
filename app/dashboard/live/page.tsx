// app/dashboard/live/page.tsx
'use client';

import { Tv2 } from 'lucide-react';
import EventCard from '@/components/betting/EventCard';

const LIVE_EVENTS = [
  {
    id: 'l1', homeTeam: 'Real Madrid', awayTeam: 'Barcelona',
    startAt: new Date(), status: 'LIVE',
    competition: { name: 'La Liga', sport: { name: 'Football' } },
    markets: [{
      id: 'm1', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o1', label: '1', odds: 2.10 },
        { id: 'o2', label: 'X', odds: 3.20 },
        { id: 'o3', label: '2', odds: 3.50 },
      ],
    }],
  },
  {
    id: 'l2', homeTeam: 'Lakers', awayTeam: 'Bulls',
    startAt: new Date(), status: 'LIVE',
    competition: { name: 'NBA', sport: { name: 'Basketball' } },
    markets: [{
      id: 'm2', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o4', label: '1', odds: 1.75 },
        { id: 'o5', label: '2', odds: 2.05 },
      ],
    }],
  },
  {
    id: 'l3', homeTeam: 'Djokovic', awayTeam: 'Alcaraz',
    startAt: new Date(), status: 'LIVE',
    competition: { name: 'ATP Masters', sport: { name: 'Tennis' } },
    markets: [{
      id: 'm3', name: 'Vainqueur', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o6', label: '1', odds: 1.90 },
        { id: 'o7', label: '2', odds: 1.90 },
      ],
    }],
  },
];

export default function LivePage() {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <Tv2 className="w-6 h-6 text-danger" />
        <h1 className="font-display font-extrabold text-2xl">En direct</h1>
        <span className="badge-live">
          <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
          {LIVE_EVENTS.length} LIVE
        </span>
      </div>

      {/* Bannière live */}
      <div className="card p-4 mb-6 border-danger/20 bg-danger/5">
        <div className="flex items-center gap-2 text-danger text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
          Les cotes sont mises à jour en temps réel
        </div>
      </div>

      <div className="grid gap-4">
        {LIVE_EVENTS.map(event => (
          <EventCard key={event.id} event={event as any} />
        ))}
      </div>
    </div>
  );
}