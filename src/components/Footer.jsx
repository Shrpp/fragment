export default function Footer() {
  return (
    <footer className="
      relative flex items-center justify-between h-12 px-12
      border-t border-line
      before:content-[''] before:absolute before:top-[-1px] before:left-0 before:w-[72px] before:h-px before:bg-neon before:shadow-neon-sm
      max-sm:px-5
    ">
      <span className="font-mono text-[10px] tracking-[0.1em] text-muted max-sm:hidden">
        <span className="text-neon">[</span>FRAGMENT v0.1.0<span className="text-neon">]</span>
      </span>

      <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-muted">
        <span className="w-[5px] h-[5px] rounded-full bg-neon pulse-neon shadow-neon-sm" />
        AVAILABLE
      </span>

      <span className="font-mono text-[10px] tracking-[0.1em] text-muted">
        CARACAS // {new Date().getFullYear()}
      </span>
    </footer>
  )
}
