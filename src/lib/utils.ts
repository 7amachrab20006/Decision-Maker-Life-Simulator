import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRank(level: number): string {
  if (level >= 10) return "Zenith";
  if (level >= 9) return "Grandmaster";
  if (level >= 8) return "Sage";
  if (level >= 7) return "Elite";
  if (level >= 6) return "Specialist";
  if (level >= 5) return "Expert";
  if (level >= 4) return "Adept";
  if (level >= 3) return "Scholar";
  if (level >= 2) return "Apprentice";
  return "Novice";
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}
