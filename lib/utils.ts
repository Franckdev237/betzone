// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = 'XOF'
): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2);
}

export function calcPotentialWin(stake: number, odds: number): number {
  return parseFloat((stake * odds).toFixed(2));
}
