import type { Movie } from '../services/tmdb'

type MovieCardProps = {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => (
  <article className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 shadow-lg shadow-slate-950/40 transition-transform duration-200 hover:-translate-y-1">
    {movie.poster_path ? (
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        loading="lazy"
        className="h-72 w-full object-cover"
      />
    ) : (
      <div className="flex h-72 items-center justify-center bg-slate-800 text-slate-500">
        No poster available
      </div>
    )}
    <div className="p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-white">{movie.title}</h3>
        <span className="shrink-0 text-sm font-semibold text-amber-300">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
      <p className="text-sm text-slate-400">
        {movie.release_date ? movie.release_date.slice(0, 4) : 'Release date unavailable'}
      </p>
      <p className="mt-4 text-sm leading-6 text-slate-300">
        {movie.overview || 'No overview available.'}
      </p>
    </div>
  </article>
)

export default MovieCard
