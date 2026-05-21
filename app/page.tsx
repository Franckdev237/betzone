// app/page.tsx
import Link from 'next/link';
import { Trophy, Zap, Shield, TrendingUp, ChevronRight, Star } from 'lucide-react';

const SPORTS = [
  { emoji: '⚽', name: 'Football',    count: '240+ matchs' },
  { emoji: '🏀', name: 'Basketball',  count: '80+ matchs' },
  { emoji: '🎾', name: 'Tennis',      count: '120+ matchs' },
  { emoji: '🏈', name: 'NFL',         count: '32+ matchs' },
  { emoji: '⚾', name: 'Baseball',    count: '50+ matchs' },
  { emoji: '🏐', name: 'Volleyball',  count: '30+ matchs' },
];

const FEATURES = [
  {
    icon: Zap,
    title: 'Paris en direct',
    desc: 'Misez en temps réel avec des cotes actualisées à chaque seconde.',
  },
  {
    icon: Trophy,
    title: 'Meilleurs cotes',
    desc: "Les cotes les plus compétitives du marché, garanties.",
  },
  {
    icon: Shield,
    title: '100% Sécurisé',
    desc: 'Vos fonds et données sont protégés par un chiffrement de bout en bout.',
  },
  {
    icon: TrendingUp,
    title: 'Statistiques avancées',
    desc: 'Accédez aux stats, historiques et analyses pour parier malin.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950 overflow-x-hidden">
      {/* ── Header ─────────────────────────────── */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="font-display font-800 text-xl text-gradient">BetZone</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-dark-300">
            <Link href="#sports" className="hover:text-white transition-colors">Sports</Link>
            <Link href="#features" className="hover:text-white transition-colors">Fonctionnalités</Link>
            <Link href="#promo" className="hover:text-white transition-colors">Promotions</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn-ghost text-sm py-2 px-4">
              Connexion
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center noise-overlay">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-info/5 rounded-full blur-[100px]" />
          {/* Grid lines */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,193,7,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,193,7,0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
              Plus de 500 événements disponibles aujourd'hui
            </div>

            <h1 className="font-display font-800 text-5xl sm:text-7xl leading-[0.95] mb-6">
              Pariez
              <br />
              <span className="text-gradient">plus malin.</span>
              <br />
              Gagnez plus.
            </h1>

            <p className="text-dark-200 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
              La plateforme de paris sportifs nouvelle génération.
              Des cotes compétitives, des paiements rapides, une expérience mobile parfaite.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/auth/register" className="btn-primary text-base py-4 px-8">
                Commencer gratuitement
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/dashboard" className="btn-ghost text-base py-4 px-8">
                Voir les matchs
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/5">
              {[
                { value: '50K+',  label: 'Parieurs actifs' },
                { value: '98%',   label: 'Paiements réussis' },
                { value: '<2min', label: 'Délai de retrait' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-display font-800 text-2xl text-brand-400">{stat.value}</div>
                  <div className="text-dark-300 text-sm mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sports ─────────────────────────────── */}
      <section id="sports" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display font-800 text-3xl sm:text-4xl mb-3">
            Tous vos sports <span className="text-gradient">favoris</span>
          </h2>
          <p className="text-dark-300">Plus de 20 disciplines sportives couvertes 24h/24.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPORTS.map((sport) => (
            <div key={sport.name}
              className="card-hover p-4 text-center cursor-pointer group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {sport.emoji}
              </div>
              <div className="font-display font-600 text-sm mb-1">{sport.name}</div>
              <div className="text-dark-400 text-xs">{sport.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────── */}
      <section id="features" className="py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-3xl sm:text-4xl mb-3">
              Pourquoi <span className="text-gradient">BetZone</span> ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6 group hover:border-brand-500/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4
                                group-hover:bg-brand-500/20 transition-colors duration-300">
                  <f.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-display font-700 text-base mb-2">{f.title}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section id="promo" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="card relative overflow-hidden p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-info/5" />
          <div className="relative z-10">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-400 fill-brand-400" />
              ))}
            </div>
            <h2 className="font-display font-800 text-3xl sm:text-5xl mb-4">
              Bonus de bienvenue
              <span className="text-gradient block">jusqu'à 50 000 XOF</span>
            </h2>
            <p className="text-dark-200 max-w-xl mx-auto mb-8">
              Inscrivez-vous aujourd'hui et recevez un bonus sur votre premier dépôt.
              Conditions générales applicables.
            </p>
            <Link href="/auth/register" className="btn-primary text-base py-4 px-10">
              Réclamer mon bonus
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row
                        items-center justify-between gap-4 text-sm text-dark-400">
          <div className="flex items-center gap-2">
            <span>🏆</span>
            <span className="font-display text-white">BetZone</span>
            <span>— Pariez responsablement.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">CGU</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
