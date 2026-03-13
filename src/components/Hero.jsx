import { useEffect, useRef, useState } from 'react'

const NAME_LINE1 = 'LUIS'
const NAME_LINE2 = 'LIMA'
const TAG_LINE   = 'Full Stack Developer — Caracas'
const ROLE_LINE  = 'Full Stack · Data Science · Cloud'
const BIO        = "Full stack developer and data scientist at Yummy (YC21). I build across the entire stack — production APIs, data pipelines, and the interfaces people actually use."

const GLITCH_CHARS = '!#$%&<>?@0123456789ABCDEF▓▒░█▄▀■□◆◇※Ψ∆'

export default function Hero() {
  const layer1Ref = useRef(null)
  const layer2Ref = useRef(null)
  const layer3Ref = useRef(null)
  const titleRef  = useRef(null)

  const [glitchedName, setGlitchedName] = useState(NAME_LINE2)

  useEffect(() => {
    const mouse  = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let raf

    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  - 0.5
      mouse.y = (e.clientY / window.innerHeight) - 0.5
    }

    const tick = () => {
      smooth.x += (mouse.x - smooth.x) * 0.055
      smooth.y += (mouse.y - smooth.y) * 0.055

      const x = smooth.x, y = smooth.y

      if (layer1Ref.current)
        layer1Ref.current.style.transform = `translate(${x * 60}px, ${y * 60}px)`
      if (layer2Ref.current)
        layer2Ref.current.style.transform = `translate(${x * 28}px, ${y * 28}px)`
      if (layer3Ref.current)
        layer3Ref.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`
      if (titleRef.current)
        titleRef.current.style.transform =
          `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    let tid

    const run = () => {
      if (!mounted) return
      let frame = 0
      const total = 8 + Math.floor(Math.random() * 14)

      const step = () => {
        if (!mounted) return
        if (frame++ >= total) {
          setGlitchedName(NAME_LINE2)
          tid = setTimeout(run, 2000 + Math.random() * 6000)
          return
        }
        setGlitchedName(
          NAME_LINE2.split('').map(c =>
            Math.random() < 0.45
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : c
          ).join('')
        )
        tid = setTimeout(step, 35 + Math.random() * 55)
      }
      step()
    }

    tid = setTimeout(run, 1200)
    return () => { mounted = false; clearTimeout(tid) }
  }, [])

  const layerBase = {
    position: 'absolute',
    right: '-8%',
    top: '50%',
    marginTop: '-340px',
    width: 'min(68vw, 680px)',
    pointerEvents: 'none',
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-[104px] pb-16 px-20
                 grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_auto]
                 max-sm:px-5 max-sm:pb-10"
    >
      <div className="scan-sweep" />

      <div ref={layer1Ref} style={layerBase}>
        <svg viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g style={{ transformOrigin: '450px 450px', animation: 'spin 120s linear infinite' }}>
            <polygon points="450,50 850,450 450,850 50,450"
              stroke="white" strokeWidth="0.8" strokeDasharray="6 24" opacity="0.15"/>
          </g>
        </svg>
      </div>

      <div ref={layer2Ref} style={layerBase}>
        <svg viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="450,160 740,450 450,740 160,450"
            stroke="white" strokeWidth="0.5" strokeDasharray="3 18" opacity="0.09"/>
          <polygon points="450,270 630,450 450,630 270,450"
            stroke="white" strokeWidth="0.4" opacity="0.05"/>
          <line x1="450" y1="0"   x2="450" y2="900" stroke="white" strokeWidth="0.4" opacity="0.04"/>
          <line x1="0"   y1="450" x2="900" y2="450" stroke="white" strokeWidth="0.4" opacity="0.04"/>
          <line x1="50"  y1="50"  x2="850" y2="850" stroke="white" strokeWidth="0.3" opacity="0.025"/>
          <line x1="850" y1="50"  x2="50"  y2="850" stroke="white" strokeWidth="0.3" opacity="0.025"/>
        </svg>
      </div>

      <div ref={layer3Ref} style={layerBase}>
        <svg viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="450" cy="450" r="5"  fill="white" opacity="0.7"/>
          <circle cx="450" cy="450" r="22" stroke="white" strokeWidth="0.6" opacity="0.3"/>
          <circle cx="450" cy="450" r="60" stroke="white" strokeWidth="0.3" strokeDasharray="2 10" opacity="0.15"/>
          <path d="M70 90 L70 70 L90 70"       stroke="white" strokeWidth="1.5" opacity="0.55"/>
          <path d="M810 70 L830 70 L830 90"    stroke="white" strokeWidth="1.5" opacity="0.55"/>
          <path d="M70 810 L70 830 L90 830"    stroke="white" strokeWidth="1.5" opacity="0.55"/>
          <path d="M830 810 L830 830 L810 830" stroke="white" strokeWidth="1.5" opacity="0.55"/>
          <line x1="450" y1="50"  x2="450" y2="72"  stroke="white" strokeWidth="1.2" opacity="0.55"/>
          <line x1="850" y1="450" x2="828" y2="450" stroke="white" strokeWidth="1.2" opacity="0.55"/>
          <line x1="450" y1="850" x2="450" y2="828" stroke="white" strokeWidth="1.2" opacity="0.55"/>
          <line x1="50"  y1="450" x2="72"  y2="450" stroke="white" strokeWidth="1.2" opacity="0.55"/>
        </svg>
      </div>

      <div className="col-start-1 row-start-1 flex items-center gap-2.5 self-start pt-0.5 fade-up
                      font-mono text-[10px] tracking-[0.12em] text-muted relative z-10
                      max-sm:flex-wrap max-sm:gap-y-1">
        <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0 pulse-neon shadow-neon-sm" />
        <span className="text-neon">SYS:ONLINE</span>
        <span className="text-dim">//</span>
        <span>LOC:CARACAS</span>
        <span className="text-dim hidden sm:inline">//</span>
        <span className="hidden sm:inline">STATUS:AVAILABLE</span>
      </div>

      <div className="col-start-2 row-start-1 self-start pt-0.5 text-right fade-up
                      font-mono text-[10px] tracking-[0.12em] text-muted hidden md:block relative z-10">
        {TAG_LINE}
      </div>

      <div
        ref={titleRef}
        className="col-span-full row-start-2 flex flex-col justify-center py-12 fade-up-1 relative z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="font-sans font-extrabold leading-[0.88] tracking-[-0.03em] text-text vhs-jitter
                        text-[clamp(72px,14vw,160px)]">
          {NAME_LINE1}
        </div>
        <div className="font-sans font-extrabold leading-[0.88] tracking-[-0.03em] text-neon
                        text-[clamp(72px,14vw,160px)] text-glow-lg glitch flicker">
          {glitchedName}<span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </div>
      </div>

      <div className="col-span-full row-start-3 flex justify-between items-end gap-16 pt-8
                      border-t border-line fade-up-2 relative z-10
                      max-sm:flex-col max-sm:items-start max-sm:gap-5 max-sm:pt-5">
        <div className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase shrink-0">
          {ROLE_LINE}
        </div>
        <div className="flex flex-col items-end gap-3.5 max-w-[440px]
                        max-sm:items-start max-sm:max-w-full">
          <p className="text-sm leading-7 text-muted text-right max-sm:text-left">{BIO}</p>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-dim uppercase">
            <span className="pulse-neon text-neon">↓</span>
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  )
}
