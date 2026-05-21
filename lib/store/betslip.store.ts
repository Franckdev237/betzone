// lib/store/betslip.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BetSelection {
  outcomeId:     string;
  eventId:       string;
  eventName:     string;   // "PSG vs Marseille"
  marketName:    string;   // "Résultat Final"
  outcomeName:   string;   // "1", "X", "2"
  odds:          number;
}

interface BetslipStore {
  selections:    BetSelection[];
  stake:         number;
  addSelection:  (s: BetSelection) => void;
  removeSelection: (outcomeId: string) => void;
  clearSlip:     () => void;
  setStake:      (amount: number) => void;
  totalOdds:     () => number;
  potentialWin:  () => number;
}

export const useBetslipStore = create<BetslipStore>()(
  persist(
    (set, get) => ({
      selections: [],
      stake: 0,

      addSelection: (s) =>
        set((state) => {
          const exists = state.selections.find((x) => x.outcomeId === s.outcomeId);
          if (exists) return state;
          // Max 10 sélections dans un combiné
          if (state.selections.length >= 10) return state;
          return { selections: [...state.selections, s] };
        }),

      removeSelection: (outcomeId) =>
        set((state) => ({
          selections: state.selections.filter((s) => s.outcomeId !== outcomeId),
        })),

      clearSlip: () => set({ selections: [], stake: 0 }),

      setStake: (amount) => set({ stake: amount }),

      totalOdds: () =>
        get().selections.reduce((acc, s) => acc * s.odds, 1),

      potentialWin: () => {
        const odds = get().totalOdds();
        return parseFloat((get().stake * odds).toFixed(2));
      },
    }),
    { name: 'betzone-betslip' }
  )
);
