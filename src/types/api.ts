import { Anime } from './anime'

export interface FetchResults {
  currentPage: number
  hasNextPage: boolean
  totalPages: number
  totalResults: number
  results: Anime[]
}
