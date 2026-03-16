import HUDPhoto from './HUDPhoto'

const BIRTH_YEAR  = 2003
const BIRTH_MONTH = 7
const BIRTH_DAY   = 1
const age = (() => {
  const now = new Date()
  let a = now.getFullYear() - BIRTH_YEAR
  if (now < new Date(now.getFullYear(), BIRTH_MONTH - 1, BIRTH_DAY)) a--
  return a
})()

const BIO = [
  `${age} y/o full stack developer and data scientist based in Caracas. I work at Yummy (YC21) building the systems that keep food moving — APIs, data pipelines, and the dashboards people rely on daily.`,
  "I move across the stack without friction: React frontends, Python data science, Go/Node backends, cloud infra. The goal is always the same — ship something that works and holds up.",
  "Currently open to interesting projects and remote opportunities. I care about clean interfaces, reliable systems, and code that doesn't need a 30-minute explanation to understand.",
]

const LINKS = [
  { label: 'GitHub',   href: 'https://github.com/Shrpp' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/luismlc/' },
  { label: 'Email',    href: 'mailto:me@shrpp.dev' },
]

const STACK = [
  { name: 'TypeScript', sub: 'Node / React' },
  { name: 'Python',     sub: 'ML / Data' },
  { name: 'Go',         sub: 'Services / APIs' },
  { name: 'React',      sub: 'Frontend / UI' },
  { name: 'Rust',       sub: 'Systems / CLI' },
  { name: 'Docker',     sub: 'Infra / Cloud' },
  { name: 'FastAPI',    sub: 'REST / Python' },
  { name: 'NestJS',     sub: 'Backend / Node' },
  { name: 'TensorFlow', sub: 'Deep Learning' },
  { name: 'AWS',        sub: 'Cloud / DevOps' },
  { name: 'Azure',      sub: 'Cloud / Microsoft' },
  { name: '.NET',       sub: 'Backend / C#' },
]

export default function About() {
  return (
    <section id="about" className="px-20 py-24 max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-12">


      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[11px] text-neon tracking-[0.1em] shrink-0 text-glow-sm">[03]</span>
        <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-muted shrink-0">
          About
        </span>
        <div className="flex-1 h-px bg-line" />
      </div>


      <div className="grid grid-cols-[300px_1fr] gap-16 items-start
                      max-lg:grid-cols-1 max-lg:gap-10">


        <div className="flex justify-center max-lg:justify-start max-sm:justify-center">
          <HUDPhoto
            src="/photo.jpg"
            name="L.LIMA"
            role="FULL STACK DEV"
            coords="10.4806°N 66.9036°W"
          />
        </div>


        <div>

          <div className="flex flex-col gap-5 mb-10">
            {BIO.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.85] text-muted">{p}</p>
            ))}
          </div>


          <div className="flex flex-col mb-12">
            {LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2.5 font-mono text-[12px] tracking-[0.08em] text-muted
                  py-3 border-b border-line first:border-t first:border-t-line
                  hover:text-text hover:text-glow-sm transition-all duration-200 group
                "
              >
                <span className="text-neon text-[11px]">&gt;</span>
                {l.label}
                <span className="ml-auto text-neon opacity-0 -translate-x-1 text-glow-sm
                                 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  ↗
                </span>
              </a>
            ))}
          </div>


          <div className="grid grid-cols-3 gap-0.5 max-sm:grid-cols-2">
            {STACK.map(s => (
              <div
                key={s.name}
                className="
                  relative pl-[22px] pr-4 py-[18px]
                  bg-surface2 border border-line
                  hover:border-neon/40 hover:bg-neon-pale hover:shadow-neon-border
                  transition-all duration-200 group overflow-hidden
                "
              >

                <div className="absolute left-0 inset-y-0 w-[2px] bg-neon opacity-25
                                group-hover:opacity-100 group-hover:shadow-neon-sm transition-all duration-200" />
                <div className="font-sans text-[13px] font-bold text-text mb-1">{s.name}</div>
                <div className="font-mono text-[9px] tracking-[0.1em] text-muted uppercase">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
