# 🏆 BetZone — Plateforme de Paris Sportifs

Application web PWA de paris sportifs construite avec **Next.js 14**, **Supabase** et **Prisma**.

---

## 📁 Structure du projet

```
betzone/
├── app/
│   ├── layout.tsx              # Layout racine + polices + PWA
│   ├── page.tsx                # Landing page publique
│   ├── globals.css             # Styles globaux + classes utilitaires
│   ├── auth/
│   │   ├── layout.tsx          # Layout 2 colonnes pour auth
│   │   ├── login/page.tsx      # Page de connexion
│   │   ├── register/page.tsx   # Page d'inscription
│   │   └── callback/route.ts   # Callback OAuth Supabase
│   ├── dashboard/
│   │   ├── layout.tsx          # Layout avec sidebar + betslip
│   │   └── page.tsx            # Page principale (événements)
│   └── api/
│       └── bets/route.ts       # API REST pour les paris
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navigation latérale
│   │   └── TopBar.tsx          # Barre supérieure
│   └── betting/
│       ├── EventCard.tsx       # Carte d'événement avec cotes
│       └── Betslip.tsx         # Panier de paris
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Client Supabase (browser)
│   │   └── server.ts           # Client Supabase (server)
│   ├── prisma.ts               # Singleton Prisma
│   ├── utils.ts                # Helpers (cn, formatCurrency...)
│   └── store/
│       └── betslip.store.ts    # Store Zustand (panier persistant)
├── prisma/
│   └── schema.prisma           # Schéma complet de la DB
├── public/
│   └── manifest.json           # Configuration PWA
├── middleware.ts               # Protection des routes
├── tailwind.config.js          # Thème personnalisé (gold + dark)
└── .env.example                # Variables d'environnement
```

---

## 🚀 Démarrage rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer Supabase
1. Créez un projet sur [supabase.com](https://supabase.com)
2. Copiez `.env.example` → `.env.local`
3. Renseignez vos clés Supabase

### 3. Configurer la base de données
```bash
cp .env.example .env.local
# Éditez .env.local avec vos vraies clés

npx prisma generate      # Générer le client Prisma
npx prisma db push       # Appliquer le schéma sur Supabase
npx prisma studio        # Visualiser la DB (optionnel)
```

### 4. Lancer en développement
```bash
npm run dev
# → http://localhost:3000
```

---

## 🗄️ Modèle de données

```
User ──────── Wallet ──── Transaction
  │
  └──────── Bet ─────── BetItem ──── Outcome ──── Market ──── Event
                                                               │
                                                          Competition ─── Sport
```

---

## 🔑 Variables d'environnement

| Variable                          | Description                    |
|-----------------------------------|-------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`        | URL de votre projet Supabase  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Clé publique Supabase         |
| `DATABASE_URL`                    | URL PostgreSQL (pooler)        |
| `DIRECT_URL`                      | URL PostgreSQL (directe)       |

---

## 📱 PWA

L'application est configurée comme PWA :
- `public/manifest.json` → configuration de l'app
- Ajoutez vos icônes dans `public/icons/` (96, 192, 512px)
- Installation automatique sur mobile via le navigateur

---

## 🗓️ Prochaines étapes (Semaines 3–4)

- [ ] Page `/dashboard/sports` — navigation par sport
- [ ] Page `/dashboard/live` — événements en direct (WebSocket)
- [ ] Intégration API-Football (cotes en temps réel)
- [ ] Page `/dashboard/wallet` — dépôt/retrait CinetPay
- [ ] Page `/dashboard/history` — historique des paris

---

## ⚠️ Avertissement légal

Les paris en ligne sont réglementés. Vérifiez la législation de votre pays avant tout lancement commercial. Cette application est destinée à un usage de développement/MVP.
