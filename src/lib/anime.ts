import axios from 'axios'
import { ensureUrlEndsWithSlash } from './utils'
import { FetchResults } from '@/types/api'
import { Anime, Episode } from '@/types/anime'

const BASE_URL = ensureUrlEndsWithSlash(import.meta.env.VITE_BACKEND_URL)

export async function searchAnime(id: string): Promise<FetchResults> {
  const url: string = `${BASE_URL}meta/anilist/advanced-search?query=${id}`

  const response = await axios.get(url)
  // After obtaining the response, verify it for errors or empty data
  if (
    response.status !== 200 ||
    (response.data.statusCode && response.data.statusCode >= 400)
  ) {
    const errorMessage = response.data.message || 'Unknown server error'
    throw new Error(
      `Server error: ${
        response.data.statusCode || response.status
      } ${errorMessage}`
    )
  }
  // Assuming response data is valid, store it in the cache
  return response.data // Return the newly fetched data
}

export async function animeInfo(id: string): Promise<Anime> {
  const url: string = `${BASE_URL}meta/anilist/data/${id}`

  const response = await axios.get(url)
  // After obtaining the response, verify it for errors or empty data
  if (
    response.status !== 200 ||
    (response.data.statusCode && response.data.statusCode >= 400)
  ) {
    const errorMessage = response.data.message || 'Unknown server error'
    throw new Error(
      `Server error: ${
        response.data.statusCode || response.status
      } ${errorMessage}`
    )
  }
  // Assuming response data is valid, store it in the cache
  return response.data // Return the newly fetched data
}

export async function getAnimeEpisodes(id: string): Promise<Episode[]> {
  const url = `${BASE_URL}meta/anilist/episodes/${id}?gogoanime}`

  const response = await axios.get(url)

  // After obtaining the response, verify it for errors or empty data
  if (
    response.status !== 200 ||
    (response.data.statusCode && response.data.statusCode >= 400)
  ) {
    const errorMessage = response.data.message || 'Unknown server error'
    throw new Error(
      `Server error: ${
        response.data.statusCode || response.status
      } ${errorMessage}`
    )
  }
  // Assuming response data is valid, store it in the cache
  return response.data // Return the newly fetched data
}

export async function getAnimeStreamingLinks(id: string) {
  const url = `${BASE_URL}meta/anilist/watch/${id}`

  const response = await axios.get(url)

  // After obtaining the response, verify it for errors or empty data
  if (
    response.status !== 200 ||
    (response.data.statusCode && response.data.statusCode >= 400)
  ) {
    const errorMessage = response.data.message || 'Unknown server error'
    throw new Error(
      `Server error: ${
        response.data.statusCode || response.status
      } ${errorMessage}`
    )
  }
  // Assuming response data is valid, store it in the cache
  return response.data // Return the newly fetched data
}
