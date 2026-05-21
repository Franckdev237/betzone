// app/auth/layout.tsx
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* ── Panneau gauche (visuel) ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 to-dark-950" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-info/5 rounded-full blur-[80px]" />
        {/* Grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,193,7,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,193,7,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <span className="font-display font-800 text-2xl text-gradient">BetZone</span>
        </div>

        {/* Contenu central */}
        <div className="relative z-10">
          <blockquote className="text-3xl font-display font-700 leading-tight mb-6">
            "Les champions ne sont pas faits dans les salles de gym. Ils sont faits de ce qu'ils ont au fond d'eux."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-lg">⚽</div>
            <div>
              <div className="font-600 text-sm">Communauté BetZone</div>
              <div className="text-dark-400 text-xs">+50 000 parieurs actifs</div>
            </div>
          </div>
        </div>

        {/* Stats bas */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { v: '500+', l: 'Événements/jour' },
            { v: '98%',  l: 'Taux de paiement' },
            { v: '24/7', l: 'Support client' },
          ].map(s => (
            <div key={s.l} className="card p-4 text-center">
              <div className="font-display font-800 text-xl text-brand-400">{s.v}</div>
              <div className="text-dark-400 text-xs mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panneau droit (formulaire) ─── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <span className="text-2xl">🏆</span>
            <Link href="/" className="font-display font-800 text-xl text-gradient">BetZone</Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
