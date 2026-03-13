export default function HUDPhoto({
  src    = '/photo.jpg',
  name   = 'L.LIMA',
  role   = 'FULL STACK DEV',
  coords = '10.4806°N 66.9036°W',
}) {
  return (
    <div className="relative inline-flex flex-col font-mono select-none w-full max-w-[320px]">

      <div className="flex items-center justify-between px-3 py-[7px]
                      border border-b-0 border-neon/25 bg-surface">
        <span className="text-[9px] tracking-[0.18em] text-neon/50">ID:001</span>
        <div className="flex items-center gap-1.5">
          <span className="w-px h-3 bg-neon/20" />
          <span className="text-[9px] tracking-[0.18em] text-muted">// {name} //</span>
          <span className="w-px h-3 bg-neon/20" />
        </div>
        <span className="text-[9px] tracking-[0.18em] text-neon/50">LOC:CCS</span>
      </div>

      <div
        className="relative overflow-hidden border border-neon/25"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
        }}
      >
        <img
          src={src}
          alt={name}
          className="block w-full aspect-[3/4] object-cover object-top"
          style={{ filter: 'contrast(1.12) saturate(0.5) brightness(0.88)' }}
          onError={e => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextSibling.style.display = 'flex'
          }}
        />

        <div className="hidden w-full aspect-[3/4] bg-surface2 items-center justify-center
                        border-2 border-dashed border-neon/15">
          <div className="text-center">
            <div className="text-[28px] text-neon/20 mb-2">◈</div>
            <div className="text-[8px] tracking-[0.2em] text-muted uppercase">
              Add photo.jpg<br />to /public/
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 3px)',
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-2/5 pointer-events-none dither"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 30%, transparent 100%)',
          }}
        />

        <svg className="absolute top-0 left-0 w-7 h-7" viewBox="0 0 28 28" fill="none">
          <path d="M14 2 L2 2 L2 14" stroke="white" strokeWidth="1.5" opacity="0.7"/>
        </svg>

        <svg className="absolute top-0 right-0 w-7 h-7" viewBox="0 0 28 28" fill="none">
          <path d="M14 2 L26 2" stroke="white" strokeWidth="1.5" opacity="0.4"/>
          <path d="M26 2 L26 14" stroke="white" strokeWidth="1.5" opacity="0.4"/>
          <path d="M14 2 L26 14" stroke="white" strokeWidth="0.8" opacity="0.25"/>
        </svg>

        <svg className="absolute bottom-0 left-0 w-7 h-7" viewBox="0 0 28 28" fill="none">
          <path d="M2 14 L2 26 L14 26" stroke="white" strokeWidth="1.5" opacity="0.7"/>
        </svg>

        <svg className="absolute bottom-0 right-0 w-7 h-7" viewBox="0 0 28 28" fill="none">
          <path d="M26 14 L26 26 L14 26" stroke="white" strokeWidth="1.5" opacity="0.4"/>
          <path d="M14 26 L26 14" stroke="white" strokeWidth="0.8" opacity="0.25"/>
        </svg>

        <div
          className="absolute left-2 top-1/2 text-[7px] tracking-[0.22em] text-neon/35 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          {coords}
        </div>

        <div className="absolute right-2.5 top-1/4 flex flex-col gap-[5px]">
          {[1, 0.5, 0.3, 0.5, 1].map((op, i) => (
            <div key={i} className="w-2 h-px bg-white" style={{ opacity: op * 0.35 }} />
          ))}
        </div>

        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.35) 60%, transparent)',
            animation: 'scanSweep 6s linear infinite',
            animationDelay: '-2s',
          }}
        />

        <div className="absolute bottom-3 right-3 text-right">
          <div className="text-[7px] tracking-[0.15em] text-neon/40 uppercase">VERIFIED</div>
          <div className="text-[7px] tracking-[0.1em] text-muted/50">2026</div>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-[7px]
                      border border-t-0 border-neon/25 bg-surface">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-neon pulse-neon shadow-neon-sm" />
          <span className="text-[9px] tracking-[0.18em] text-neon">ONLINE</span>
        </div>
        <span className="text-[8px] tracking-[0.12em] text-muted">{role}</span>
        <span className="text-[9px] tracking-[0.18em] text-neon/30">◈</span>
      </div>

      <div className="absolute -top-[1px] -left-[1px] w-8 h-[1px] bg-neon opacity-60" />
      <div className="absolute -top-[1px] -left-[1px] w-[1px] h-8 bg-neon opacity-60" />
      <div className="absolute -bottom-[1px] -right-[1px] w-8 h-[1px] bg-neon opacity-60" />
      <div className="absolute -bottom-[1px] -right-[1px] w-[1px] h-8 bg-neon opacity-60" />
    </div>
  )
}
