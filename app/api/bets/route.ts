// app/api/bets/route.ts
import { NextResponse }               from 'next/server';
import type { NextRequest }           from 'next/server';
import { createRouteHandlerClient }   from '@supabase/auth-helpers-nextjs';
import { cookies }                    from 'next/headers';
import { prisma }                     from '@/lib/prisma';
import { z }                          from 'zod';

const betSchema = z.object({
  selections: z.array(z.object({
    outcomeId: z.string(),
    odds:      z.number().positive(),
  })).min(1).max(10),
  stake: z.number().positive(),
  type:  z.enum(['SINGLE', 'COMBINED']),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }

    const body = await req.json();
    const { selections, stake, type } = betSchema.parse(body);

    // Récupérer le portefeuille
    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (!wallet) {
      return NextResponse.json({ message: 'Portefeuille introuvable' }, { status: 404 });
    }

    if (wallet.balance.toNumber() < stake) {
      return NextResponse.json({ message: 'Solde insuffisant' }, { status: 400 });
    }

    // Calculer la cote totale
    const totalOdds   = selections.reduce((acc, s) => acc * s.odds, 1);
    const potentialWin = parseFloat((stake * totalOdds).toFixed(2));

    // Transaction atomique
    const bet = await prisma.$transaction(async (tx) => {
      // Débiter le portefeuille
      await tx.wallet.update({
        where: { id: wallet.id },
        data:  { balance: { decrement: stake } },
      });

      // Créer la transaction
      await tx.transaction.create({
        data: {
          userId:   session.user.id,
          walletId: wallet.id,
          type:     'BET_PLACED',
          amount:   stake,
          status:   'COMPLETED',
        },
      });

      // Créer le pari
      const newBet = await tx.bet.create({
        data: {
          userId:       session.user.id,
          type,
          stake,
          totalOdds,
          potentialWin,
          status:       'PENDING',
          betItems: {
            create: selections.map(s => ({
              outcomeId: s.outcomeId,
              odds:      s.odds,
            })),
          },
        },
        include: { betItems: true },
      });

      return newBet;
    });

    return NextResponse.json({ bet }, { status: 201 });

  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ message: 'Données invalides', errors: err.errors }, { status: 422 });
    }
    console.error('Bet error:', err);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }

    const bets = await prisma.bet.findMany({
      where:   { userId: session.user.id },
      include: {
        betItems: {
          include: {
            outcome: {
              include: {
                market: {
                  include: {
                    event: {
                      include: {
                        competition: { include: { sport: true } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ bets });
  } catch (err) {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
