import { useEffect, useRef } from 'react'

const TRAIL = 18
const NEON  = '#00C8FF'

export default function Cursor() {
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const trailRefs = useRef([])
  const glowRef   = useRef(null)
  const linesRef  = useRef({ t: null, b: null, l: null, r: null })

  useEffect(() => {
    const mouse  = { x: -300, y: -300 }
    const smooth = { x: -300, y: -300 }
    const trail  = Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 }))
    let onLink   = false
    let clicking = false
    let raf

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      onLink = !!e.target.closest('a, button, [role="button"]')
    }
    const onDown = () => { clicking = true }
    const onUp   = () => { clicking = false }

    const animate = () => {
      smooth.x += (mouse.x - smooth.x) * 0.18
      smooth.y += (mouse.y - smooth.y) * 0.18

      trail.unshift({ x: smooth.x, y: smooth.y })
      trail.length = TRAIL

      if (dotRef.current) {
        dotRef.current.style.left = `${smooth.x}px`
        dotRef.current.style.top  = `${smooth.y}px`
      }

      if (ringRef.current) {
        const size = clicking ? 14 : onLink ? 40 : 22
        ringRef.current.style.left   = `${smooth.x}px`
        ringRef.current.style.top    = `${smooth.y}px`
        ringRef.current.style.width  = `${size}px`
        ringRef.current.style.height = `${size}px`
      }

      if (glowRef.current) {
        glowRef.current.style.left = `${smooth.x}px`
        glowRef.current.style.top  = `${smooth.y}px`
      }

      const lines = linesRef.current
      const gap = clicking ? 6 : onLink ? 12 : 9
      const len = clicking ? 6 : onLink ? 10 : 8
      if (lines.t) {
        lines.t.style.left   = `${smooth.x}px`
        lines.t.style.top    = `${smooth.y - gap - len}px`
        lines.t.style.height = `${len}px`
      }
      if (lines.b) {
        lines.b.style.left   = `${smooth.x}px`
        lines.b.style.top    = `${smooth.y + gap}px`
        lines.b.style.height = `${len}px`
      }
      if (lines.l) {
        lines.l.style.top   = `${smooth.y}px`
        lines.l.style.left  = `${smooth.x - gap - len}px`
        lines.l.style.width = `${len}px`
      }
      if (lines.r) {
        lines.r.style.top   = `${smooth.y}px`
        lines.r.style.left  = `${smooth.x + gap}px`
        lines.r.style.width = `${len}px`
      }

      trailRefs.current.forEach((el, i) => {
        if (!el) return
        const p     = trail[i] || trail[trail.length - 1]
        const scale = Math.max(0.5, 1 - i * 0.055)
        el.style.left    = `${p.x}px`
        el.style.top     = `${p.y}px`
        el.style.opacity = Math.max(0, 0.55 - i * 0.032)
        el.style.width   = `${scale * 4}px`
        el.style.height  = `${scale * 4}px`
      })

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  const fixed = 'fixed pointer-events-none -translate-x-1/2 -translate-y-1/2'

  return (
    <>
      <div
        ref={glowRef}
        className={`${fixed} z-[9990] rounded-full`}
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(0,200,255,0.05) 0%, transparent 65%)',
        }}
      />

      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          className={`${fixed} z-[9994] rounded-full bg-neon`}
          style={{ boxShadow: i < 4 ? `0 0 4px ${NEON}b3` : 'none' }}
        />
      ))}

      <div
        ref={ringRef}
        className={`${fixed} z-[9997] rounded-full border border-neon`}
        style={{
          width: 22, height: 22,
          boxShadow: `0 0 10px ${NEON}80, inset 0 0 6px ${NEON}1a`,
          transition: 'width 0.12s ease, height 0.12s ease',
        }}
      />

      <div
        ref={dotRef}
        className={`${fixed} z-[9998] rounded-full bg-neon`}
        style={{ width: 3, height: 3, boxShadow: `0 0 8px ${NEON}` }}
      />

      {[
        ['t', { width: 1, height: 8, position: 'fixed', background: NEON, opacity: 0.7, transform: 'translateX(-50%)' }],
        ['b', { width: 1, height: 8, position: 'fixed', background: NEON, opacity: 0.7, transform: 'translateX(-50%)' }],
        ['l', { height: 1, width: 8,  position: 'fixed', background: NEON, opacity: 0.7, transform: 'translateY(-50%)' }],
        ['r', { height: 1, width: 8,  position: 'fixed', background: NEON, opacity: 0.7, transform: 'translateY(-50%)' }],
      ].map(([key, style]) => (
        <div
          key={key}
          ref={el => { linesRef.current[key] = el }}
          className="pointer-events-none z-[9997]"
          style={{ ...style, boxShadow: `0 0 4px ${NEON}cc` }}
        />
      ))}
    </>
  )
}
