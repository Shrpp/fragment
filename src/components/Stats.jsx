import { useMemo } from 'react'
import { useGitHubStats, useMediumPosts } from '../hooks'

const GITHUB_USERNAME = 'Shrpp'
const MEDIUM_USERNAME = '@shrpp'

const CAREER_START = new Date('2021-03-01')

function calcYears(start) {
  const now = new Date()
  const y   = now.getFullYear() - start.getFullYear()
  return now < new Date(now.getFullYear(), start.getMonth(), start.getDate()) ? y - 1 : y
}

function fmt(n, unit) {
  if (n === null) return { value: '—', unit: '' }
  if (unit === 'k' && n >= 1000) return { value: (n / 1000).toFixed(1).replace('.0', ''), unit: 'k' }
  return { value: String(n), unit }
}

export default function Stats() {
  const { repos, stars }    = useGitHubStats(GITHUB_USERNAME)
  const { total: articles } = useMediumPosts(MEDIUM_USERNAME)

  const STATS = useMemo(() => [
    { ...fmt(repos, '+'),                 label: 'Projects shipped' },
    { value: String(calcYears(CAREER_START)), unit: 'yr', label: 'Experience' },
    { ...fmt(stars, stars > 999 ? 'k' : ''), label: 'GitHub stars' },
    { ...fmt(articles, '+'),              label: 'Articles written' },
  ], [repos, stars, articles])


  return (
    <div className="grid grid-cols-4 border-y border-line max-sm:grid-cols-2">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className="relative px-12 py-10 border-r border-line last:border-r-0
                     hover:bg-neon/5 transition-colors duration-200 group overflow-hidden
                     max-sm:even:border-r-0 max-sm:[&:nth-child(3)]:border-t max-sm:px-6 max-sm:py-7"
        >
          <div
            className="absolute inset-x-0 top-0 h-0.5 bg-neon scale-x-0 group-hover:scale-x-100
                          transition-transform duration-300 origin-left shadow-neon-sm"
          />

          <div className="font-mono text-[10px] text-dim tracking-[0.1em] mb-5">
            {String(i).padStart(2, "0")}
          </div>

          <div
            className="font-sans font-extrabold leading-none text-neon text-glow-sm mb-3
                          text-[clamp(36px,4.5vw,60px)]"
          >
            {s.value}
            {s.unit && (
              <span className="text-[0.42em] font-normal text-muted ml-0.5">
                {s.unit}
              </span>
            )}
          </div>

          <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
