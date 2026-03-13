import { useGitHubRepos } from "../hooks";

const GITHUB_USERNAME = "Shrpp";

const LANG_COLORS = {
  Python: "#3572A5",
  Go: "#00ADD8",
  TypeScript: "#3178C6",
  Rust: "#CE422B",
  "C++": "#F34B7D",
  JavaScript: "#F1E05A",
  default: "#00C8FF",
};

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos(GITHUB_USERNAME);

  return (
    <section
      id="projects"
      className="px-20 py-24 max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-12"
    >

      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-[11px] text-neon tracking-[0.1em] shrink-0 text-glow-sm">
          [01]
        </span>
        <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-muted shrink-0">
          Selected Work
        </span>
        <div className="flex-1 h-px bg-line" />
      </div>

      {loading && (
        <p className="font-mono text-[11px] text-muted tracking-[0.06em] py-4">
          // Fetching repositories...
        </p>
      )}
      {error && (
        <p className="font-mono text-[11px] text-muted tracking-[0.06em] py-4">
          // Could not connect — showing mock data
        </p>
      )}

      <div className="flex flex-col">
        {[...repos].sort((a, b) => b.stars - a.stars).map((repo, i) => (
          <a
            key={repo.id}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              grid grid-cols-[56px_1fr_auto] items-center gap-7
              px-4 -mx-4 py-6
              border-b border-line border-l-2 border-l-transparent
              first:border-t first:border-t-line
              hover:border-l-neon hover:bg-neon/5
              transition-all duration-150 group
              max-sm:grid-cols-[36px_1fr_auto] max-sm:gap-3 max-sm:px-2 max-sm:-mx-2 max-sm:py-4
            "
          >
            <div
              className="font-mono text-[11px] text-neon tracking-[0.06em] opacity-30
                            group-hover:opacity-100 transition-opacity duration-200"
            >
              {String(i + 1).padStart(3, "0")}
            </div>

            <div className="min-w-0">
              <div
                className="font-sans text-[18px] font-bold tracking-[-0.02em] text-muted mb-1.5
                              group-hover:text-text group-hover:text-glow-sm transition-all duration-200
                              max-sm:text-[15px]"
              >
                {repo.name}
              </div>
              <div
                className="text-[13px] leading-relaxed text-dim mb-3 max-w-[560px]
                              truncate max-sm:hidden"
              >
                {repo.description}
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className="font-mono text-[10px] tracking-[0.06em] font-medium"
                  style={{
                    color: LANG_COLORS[repo.language] || LANG_COLORS.default,
                  }}
                >
                  {repo.language}
                </span>
                {repo.topics.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] text-muted bg-surface2 border border-line
                               px-2 py-0.5 tracking-[0.08em] max-sm:hidden"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="font-mono text-[11px] text-muted tracking-[0.06em]">
                ★ {repo.stars}
              </div>
              <div
                className="text-[17px] text-neon opacity-0 -translate-x-1.5
                              group-hover:opacity-100 group-hover:translate-x-0
                              transition-all duration-200 text-glow-sm"
              >
                ↗
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
