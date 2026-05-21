import { Flame, Clock, Trophy, Star, TrendingUp } from 'lucide-react';
import EventCard from '@/components/betting/EventCard';
import { prisma } from '@/lib/prisma';

// Forçage dynamique strict pour Next.js et Vercel
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function getEvents() {
  try {
    // Requête simplifiée pour éviter tout conflit de tri ou de type au build
    const data = await prisma.event.findMany({
      where: { 
        status: { in: ['UPCOMING', 'LIVE'] } 
      },
      include: {
        competition: { include: { sport: true } },
        markets: {
          where: { isOpen: true },
          take: 1,
          include: { outcomes: true },
        },
      },
      take: 20,
    });

    if (!data || data.length === 0) return DEMO_EVENTS;
    return data;
  } catch (error) {
    console.log("Prisma non disponible au build, utilisation des donnees de demo.");
    return DEMO_EVENTS;
  }
}

// Données de démo avec des chaînes de caractères pures pour les dates (Zéro plantage possible)
const DEMO_EVENTS = [
  {
    id: 'l1', homeTeam: 'Real Madrid', awayTeam: 'Barcelona',
    startAt: "2026-05-21T18:00:00.000Z", status: 'LIVE',
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
    startAt: "2026-05-21T19:30:00.000Z", status: 'LIVE',
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
    id: 'u1', homeTeam: 'PSG', awayTeam: 'Olympique de Marseille',
    startAt: "2026-05-21T21:00:00.000Z", status: 'UPCOMING',
    competition: { name: 'Ligue 1', sport: { name: 'Football' } },
    markets: [{
      id: 'm4', name: 'Résultat Final', type: 'MATCH_WINNER', isOpen: true,
      outcomes: [
        { id: 'o9',  label: '1', odds: 1.85 },
        { id: 'o10', label: 'X', odds: 3.60 },
        { id: 'o11', label: '2', odds: 4.20 },
      ],
    }],
  }
];

const QUICK_STATS = [
  { label: 'Matchs en direct', value: '12',   icon: '🔴', color: 'text-danger' },
  { label: 'Événements aujourd\'hui', value: '240+', icon: '📅', color: 'text-brand-400' },
  { label: 'Meilleure cote du jour', value: '18.50', icon: '🚀', color: 'text-success' },
  { label: 'Paris gagnants (24h)', value: '1.2K', icon: '🏆', color: 'text-info' },
];

export default async function DashboardPage() {
  const events = await getEvents();
  
  // Filtrage sécurisé
  const liveEvents     = Array.isArray(events) ? events.filter((e: any) => e?.status === 'LIVE') : [];
  const upcomingEvents = Array.isArray(events) ? events.filter((e: any) => e?.status === 'UPCOMING') : [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Bannière Coupe du Monde 2026 */}
      <div className="card relative overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-500/15 via-transparent to-info/5" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="text-danger text-xs font-semibold">EN COURS</span>
            </div>
            <div className="font-display font-extrabold text-xl mb-1">🔥 Coupe du Monde 2026</div>
            <div className="text-dark-300 text-sm">32 nations · USA / Canada / Mexique</div>
          </div>
          <button className="btn-primary text-sm py-2.5 px-5 shrink-0">Parier maintenant</button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_STATS.map(stat => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`font-display font-extrabold text-xl ${stat.color}`}>{stat.value}</div>
            <div className="text-dark-400 text-xs mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* En direct */}
      {liveEvents.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-danger" />
            <h2 className="font-display font-bold text-lg">En direct</h2>
            <span className="badge-live ml-1">{liveEvents.length} LIVE</span>
          </div>
          <div className="grid gap-3">
            {liveEvents.map((event: any) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* À venir */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-400" />
            <h2 className="font-display font-bold text-lg">À venir</h2>
          </div>
        </div>
        <div className="grid gap-3">
          {upcomingEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}