// app/dashboard/page.tsx
import { Flame, Clock, Trophy, Star, TrendingUp } from 'lucide-react';
import EventCard from '@/components/betting/EventCard';
import { prisma } from '@/lib/prisma';

async function getEvents() {
  try {
    return await prisma.event.findMany({
      where: { status: { in: ['UPCOMING', 'LIVE'] } },
      include: {
        competition: { include: { sport: true } },
        markets: {
          where: { isOpen: true },
          take: 1,
          include: { outcomes: true },
        },
      },
      orderBy: [{ status: 'asc' }, { startAt: 'asc' }],
      take: 20,
    });
  } catch {
    return DEMO_EVENTS;
  }
}

// ─── Données de démo enrichies ────────────────────────────
const DEMO_EVENTS = [
  // ── LIVE ──
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
    id: 'l2', homeTeam: 'France', awayTeam: 'Brésil',
    startAt: new Date(), status: 'LIVE',
    competition: { name: 'Coupe du Monde 2026 🔥', sport: { name: 'Football' } },
    markets: [{
      id: 'm2', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o4', label: '1', odds: 2.40 },
        { id: 'o5', label: 'X', odds: 3.10 },
        { id: 'o6', label: '2', odds: 2.80 },
      ],
    }],
  },
  {
    id: 'l3', homeTeam: 'Lakers', awayTeam: 'Celtics',
    startAt: new Date(), status: 'LIVE',
    competition: { name: 'NBA', sport: { name: 'Basketball' } },
    markets: [{
      id: 'm3', name: 'Vainqueur', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o7', label: '1', odds: 1.85 },
        { id: 'o8', label: '2', odds: 1.95 },
      ],
    }],
  },

  // ── À VENIR ──
  {
    id: 'u1', homeTeam: 'PSG', awayTeam: 'Olympique de Marseille',
    startAt: new Date(Date.now() + 3_600_000), status: 'UPCOMING',
    competition: { name: 'Ligue 1', sport: { name: 'Football' } },
    markets: [{
      id: 'm4', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o9',  label: '1', odds: 1.85 },
        { id: 'o10', label: 'X', odds: 3.60 },
        { id: 'o11', label: '2', odds: 4.20 },
      ],
    }],
  },
  {
    id: 'u2', homeTeam: 'Man City', awayTeam: 'Arsenal',
    startAt: new Date(Date.now() + 7_200_000), status: 'UPCOMING',
    competition: { name: 'Premier League', sport: { name: 'Football' } },
    markets: [{
      id: 'm5', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o12', label: '1', odds: 1.65 },
        { id: 'o13', label: 'X', odds: 3.80 },
        { id: 'o14', label: '2', odds: 5.00 },
      ],
    }],
  },
  {
    id: 'u3', homeTeam: 'Bayern Munich', awayTeam: 'Borussia Dortmund',
    startAt: new Date(Date.now() + 10_800_000), status: 'UPCOMING',
    competition: { name: 'Bundesliga', sport: { name: 'Football' } },
    markets: [{
      id: 'm6', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o15', label: '1', odds: 1.55 },
        { id: 'o16', label: 'X', odds: 4.10 },
        { id: 'o17', label: '2', odds: 5.50 },
      ],
    }],
  },
  {
    id: 'u4', homeTeam: 'Argentine', awayTeam: 'Espagne',
    startAt: new Date(Date.now() + 14_400_000), status: 'UPCOMING',
    competition: { name: 'Coupe du Monde 2026 🔥', sport: { name: 'Football' } },
    markets: [{
      id: 'm7', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o18', label: '1', odds: 2.60 },
        { id: 'o19', label: 'X', odds: 3.00 },
        { id: 'o20', label: '2', odds: 2.70 },
      ],
    }],
  },
  {
    id: 'u5', homeTeam: 'Djokovic', awayTeam: 'Alcaraz',
    startAt: new Date(Date.now() + 18_000_000), status: 'UPCOMING',
    competition: { name: 'ATP Masters 1000', sport: { name: 'Tennis' } },
    markets: [{
      id: 'm8', name: 'Vainqueur', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o21', label: '1', odds: 1.90 },
        { id: 'o22', label: '2', odds: 1.90 },
      ],
    }],
  },
  {
    id: 'u6', homeTeam: 'Sénégal', awayTeam: 'Maroc',
    startAt: new Date(Date.now() + 21_600_000), status: 'UPCOMING',
    competition: { name: 'CAN 2026', sport: { name: 'Football' } },
    markets: [{
      id: 'm9', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o23', label: '1', odds: 2.20 },
        { id: 'o24', label: 'X', odds: 3.10 },
        { id: 'o25', label: '2', odds: 3.00 },
      ],
    }],
  },
  {
    id: 'u7', homeTeam: 'Coton Sport', awayTeam: 'Al Ahly',
    startAt: new Date(Date.now() + 25_200_000), status: 'UPCOMING',
    competition: { name: 'Ligue des Champions CAF', sport: { name: 'Football' } },
    markets: [{
      id: 'm10', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o26', label: '1', odds: 3.50 },
        { id: 'o27', label: 'X', odds: 3.20 },
        { id: 'o28', label: '2', odds: 2.00 },
      ],
    }],
  },
] as any[];

// ─── Stats rapides ───────────────────────────────
const QUICK_STATS = [
  { label: 'Matchs en direct', value: '12',   icon: '🔴', color: 'text-danger' },
  { label: 'Événements aujourd\'hui', value: '240+', icon: '📅', color: 'text-brand-400' },
  { label: 'Meilleure cote du jour', value: '18.50', icon: '🚀', color: 'text-success' },
  { label: 'Paris gagnants (24h)', value: '1.2K', icon: '🏆', color: 'text-info' },
];

export default async function DashboardPage() {
  const events         = await getEvents();
  const liveEvents     = events.filter((e: any) => e.status === 'LIVE');
  const upcomingEvents = events.filter((e: any) => e.status === 'UPCOMING');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

      {/* ── Bannière Coupe du Monde 2026 ── */}
      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/15 via-transparent to-info/5" />
        <div className="absolute top-0 right-0 text-[80px] opacity-10 leading-none select-none">
          🌍
        </div>
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="text-danger text-xs font-semibold">EN COURS</span>
            </div>
            <div className="font-display font-extrabold text-xl mb-1">
              🔥 Coupe du Monde 2026
            </div>
            <div className="text-dark-300 text-sm">
              32 nations · USA / Canada / Mexique · Pariez sur tous les matchs
            </div>
          </div>
          <button className="btn-primary text-sm py-2.5 px-5 shrink-0">
            Parier maintenant
          </button>
        </div>
      </div>

      {/* ── Stats rapides ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_STATS.map(stat => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`font-display font-extrabold text-xl ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-dark-400 text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── Bonus dépôt ── */}
      <div className="card relative overflow-hidden p-5">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-transparent to-transparent" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 flex items-center justify-center text-2xl shrink-0">
              🎁
            </div>
            <div>
              <div className="font-display font-bold text-base">
                Bonus 1er dépôt : +100% jusqu'à 25 000 XOF
              </div>
              <div className="text-dark-400 text-sm mt-0.5">
                Offre valable pour tout nouveau compte. Conditions applicables.
              </div>
            </div>
          </div>
          <button className="btn-primary text-sm py-2.5 px-5 shrink-0">
            En profiter
          </button>
        </div>
      </div>

      {/* ── En direct ── */}
      {liveEvents.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-danger" />
            <h2 className="font-display font-bold text-lg">En direct</h2>
            <span className="badge-live ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
              {liveEvents.length} LIVE
            </span>
          </div>
          <div className="grid gap-3">
            {liveEvents.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* ── À venir ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-400" />
            <h2 className="font-display font-bold text-lg">À venir</h2>
            <span className="text-dark-500 text-sm">({upcomingEvents.length} matchs)</span>
          </div>
          <button className="text-xs text-brand-400 hover:text-brand-300 transition-colors font-semibold">
            Voir tout →
          </button>
        </div>
        <div className="grid gap-3">
          {upcomingEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ── Cotes du moment ── */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-success" />
          <h2 className="font-display font-bold text-lg">Meilleures cotes du moment</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { match: 'France vs Angleterre', pick: 'France gagne', odds: 2.10, comp: 'Coupe du Monde 2026' },
            { match: 'Djokovic vs Alcaraz', pick: 'Alcaraz gagne', odds: 1.95, comp: 'ATP Masters' },
            { match: 'Lakers vs Warriors', pick: 'Over 220.5 pts', odds: 1.80, comp: 'NBA' },
          ].map(tip => (
            <div key={tip.match} className="card-hover p-4 cursor-pointer group">
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-3.5 h-3.5 text-brand-400 fill-brand-400" />
                <span className="text-xs text-dark-400">{tip.comp}</span>
              </div>
              <div className="font-medium text-sm mb-1">{tip.match}</div>
              <div className="text-dark-400 text-xs mb-3">{tip.pick}</div>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-brand-400 text-lg">{tip.odds}</span>
                <button className="text-xs bg-brand-500/10 border border-brand-500/20
                                   text-brand-400 px-3 py-1.5 rounded-lg
                                   hover:bg-brand-500/20 transition-colors font-semibold">
                  Parier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}