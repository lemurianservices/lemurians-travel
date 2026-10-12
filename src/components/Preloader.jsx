import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap.js'
import { IMG } from '../data/content.js'

export default function Preloader({ onDone }) {
  const root = useRef(null)
  const num = useRef(null)
  const bar = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const counter = { v: 0 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.to(counter, {
        v: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(2, '0')
          if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`
        },
      })
      tl.to('.pre-inner', { y: -24, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.1')
      tl.to(
        root.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            document.body.style.overflow = ''
            setGone(true)
            onDone && onDone()
          },
        },
        '-=0.15'
      )
    }, root)
    return () => ctx.revert()
  }, [onDone])

  if (gone) return null

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex items-center justify-center bg-ink">
      <div className="pre-inner flex flex-col items-center">
        <div className="relative mb-6 h-28 w-28">
          <span className="absolute inset-0 rounded-full border border-gold/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-gold" style={{ animationDuration: '1.4s' }} />
          <img src={IMG.logo} alt="Lemurians Travel" className="absolute inset-2 h-24 w-24 rounded-full object-cover" />
        </div>
        <h1 className="font-display text-2xl tracking-[0.4em] text-cream">LEMURIANS</h1>
        <p className="mt-2 text-[0.7rem] uppercase tracking-[0.5em] text-gold/70">Travel · Madagascar</p>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-8">
        <div className="h-px w-full max-w-md overflow-hidden bg-white/10">
          <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-goldlight" />
        </div>
        <div className="flex w-full max-w-md items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-white/40">
          <span>Loading</span>
          <span ref={num}>00</span>
        </div>
      </div>
    </div>
  )
}
