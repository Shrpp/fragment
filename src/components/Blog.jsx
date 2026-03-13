import { useMediumPosts } from '../hooks'

const MEDIUM_USERNAME = '@shrpp'

export default function Blog() {
  const { posts, loading, error } = useMediumPosts(MEDIUM_USERNAME)

  return (
    <section id="blog" className="bg-surface w-full">
      <div className="px-20 py-24 max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-12">


        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-[11px] text-neon tracking-[0.1em] shrink-0 text-glow-sm">[02]</span>
          <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-muted shrink-0">
            Writing
          </span>
          <div className="flex-1 h-px bg-line" />
        </div>

        {loading && (
          <p className="font-mono text-[11px] text-muted tracking-[0.06em] py-4">
            // Fetching articles...
          </p>
        )}

        <div className="flex flex-col">
          {posts.map((post, i) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                grid grid-cols-[28px_80px_1fr_20px] items-center gap-6
                px-4 -mx-4 py-[22px]
                border-b border-line border-l-2 border-l-transparent
                first:border-t first:border-t-line
                hover:border-l-neon hover:bg-neon/5
                transition-all duration-150 group
                max-sm:grid-cols-[28px_1fr_18px] max-sm:gap-3 max-sm:px-2 max-sm:-mx-2
              "
            >

              <div className="font-mono text-[10px] text-neon tracking-[0.06em] opacity-30
                              group-hover:opacity-100 transition-opacity">
                {String(i + 1).padStart(2, '0')}
              </div>


              <div className="font-mono text-[10px] text-muted tracking-[0.08em] uppercase shrink-0
                              max-sm:hidden">
                {post.date}
              </div>


              <div className="min-w-0">
                <div className="font-sans text-[16px] font-semibold text-muted mb-1
                                group-hover:text-text group-hover:text-glow-sm
                                transition-all duration-200 truncate max-sm:text-[14px]">
                  {post.title}
                </div>
                <div className="font-mono text-[10px] text-dim tracking-[0.06em] flex gap-2 items-center">
                  {post.readTime}
                  {post.tags.slice(0, 2).length > 0 && (
                    <span className="text-line">//</span>
                  )}
                  {post.tags.slice(0, 2).join(' · ')}
                </div>
              </div>


              <div className="text-[15px] text-neon shrink-0 opacity-0 -translate-x-1.5
                              group-hover:opacity-100 group-hover:translate-x-0
                              transition-all duration-200 text-glow-sm">
                ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
