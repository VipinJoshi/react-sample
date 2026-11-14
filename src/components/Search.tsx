type SearchProps = {
  query: string
  onQueryChange: (query: string) => void
}

const Search = ({ query, onQueryChange }: SearchProps) => (
  <label className="relative block w-full max-w-md">
    <span className="sr-only">Search movies</span>
    <input
      type="search"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder="Search by title, genre or keyword..."
      className="w-full rounded-full border border-white/10 bg-slate-900/80 py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
    />
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
      🔎
    </span>
  </label>
)

export default Search
