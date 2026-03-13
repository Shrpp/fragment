import { useClock } from "../hooks";

const LINKS = [
  { label: "Work",    id: "projects" },
  { label: "Writing", id: "blog" },
  { label: "About",   id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const time = useClock();

  const scrollTo = (id, e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="
      fixed inset-x-0 top-0 z-[200] h-[52px]
      flex items-center justify-between px-12
      bg-bg/90 backdrop-blur-xl border-b border-line
      before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neon before:opacity-60
    "
    >
      <div className="relative font-mono text-[13px] tracking-[0.14em] text-text glitch flicker">
        <span className="text-neon text-glow-lg font-bold">[</span>
        <span className="text-glow-sm">FRAGMENT</span>
        <span className="text-neon text-glow-lg font-bold">]</span>
      </div>

      <div className="flex gap-9">
        {LINKS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => scrollTo(id, e)}
            className="
              relative font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-muted
              hover:text-text transition-colors duration-200
              after:content-[''] after:absolute after:-bottom-[3px] after:left-0 after:right-0
              after:h-px after:bg-neon after:scale-x-0 hover:after:scale-x-100
              after:transition-transform after:duration-200 after:origin-left
            "
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em]">
        <span className="w-1 h-1 rounded-full bg-neon shrink-0 pulse-neon shadow-neon-sm" />
        <span className="text-[9px] tracking-[0.14em] text-neon/50 pulse-neon">SYS:</span>
        <span className="text-neon text-glow-sm flicker tabular-nums">{time}</span>
      </div>
    </nav>
  );
}
