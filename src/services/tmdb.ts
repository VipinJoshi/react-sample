const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

type MovieResponse = {
  results: Movie[]
}

export const fetchMovies = async (query: string, signal: AbortSignal): Promise<Movie[]> => {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env.local file.')
  }

  const endpoint = query ? '/search/movie' : '/movie/popular'
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'en-US')

  if (query) {
    url.searchParams.set('query', query)
  }

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}). Check your API key and try again.`)
  }

  const data = (await response.json()) as MovieResponse
  return data.results
}
