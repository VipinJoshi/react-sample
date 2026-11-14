
import { useEffect, useState } from 'react'
import MovieCard from './components/MovieCard'
import Search from './components/Search'
import { fetchMovies, type Movie } from './services/tmdb'

const App = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const normalizedQuery = query.trim()

    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true)
      setError(null)

      try {
        const results = await fetchMovies(normalizedQuery, controller.signal)
        setMovies(results)
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return
        }

        setMovies([])
        setError(caughtError instanceof Error ? caughtError.message : 'Unable to load movies.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, normalizedQuery ? 300 : 0)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [query])

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="pattern" aria-hidden="true" />

      <div className="wrapper relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-sky-950/30 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 text-lg font-bold text-white shadow-lg shadow-sky-500/30">
              M
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Discover</p>
              <h2 className="text-lg font-semibold">Movie Finder</h2>
            </div>
          </div>

          <Search query={query} onQueryChange={setQuery} />
        </header>

        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Trending now</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Find <span className="text-gradient">Movies you might enjoy</span>
              </h1>
            </div>
            <div className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-200">
              {isLoading ? 'Loading...' : `${movies.length} results`}
            </div>
          </div>

          {error ? (
            <div role="alert" className="rounded-3xl border border-red-400/30 bg-red-950/40 p-6 text-red-200">
              {error}
            </div>
          ) : isLoading ? (
            <p className="py-12 text-center text-slate-400">Loading movies...</p>
          ) : movies.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-12 text-center">
              <p className="text-xl font-semibold text-white">No movies found</p>
              <p className="mt-2 text-slate-400">Try searching for a different title, genre, or keyword.</p>
            </div>
          )}
        </section>
        <footer className="text-center text-xs text-slate-500">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </footer>
      </div>
    </main>
  )
}

export default App
