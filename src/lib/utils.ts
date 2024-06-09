import { Title } from '@/types/anime'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format title in case its an object or a string
export function formatTitle(anime: Title) {
  if (anime && anime.english) {
    return anime.english
  } else if (anime && anime.romaji) {
    return anime.romaji
  } else {
    return 'Title Not Available'
  }
}

// Utility function to ensure URL ends with a slash
export function ensureUrlEndsWithSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`
}
