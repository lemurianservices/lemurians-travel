import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { useLang } from '../i18n/LanguageContext.jsx'

function Counter({ value, suffix }) {
  const ref = useRef(null)

  useEffect(() => {
    const obj = { v: 0 }
    const isDecimal = value % 1 !== 0
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const n = isDecimal ? obj.v.toFixed(1) : Math.round(obj.v).toLocaleString('en-US')
            if (ref.current) ref.current.textContent = n + suffix
          },
        })
      },
    })
    return () => st.kill()
  }, [value, suffix])

  return (
    <span ref={ref} className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-semibold text-gold-gradient">
      0
    </span>
  )
}

export default function Stats() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest2 via-ink to-forest py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #d4af37 0, transparent 40%), radial-gradient(circle at 80% 70%, #f3e5ab 0, transparent 40%)' }} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h2 data-reveal className="mb-16 text-center font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-cream">
          {t.stats.title}
        </h2>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <div key={i} data-reveal data-reveal-delay={String(i * 0.08)} className="text-center">
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-cream/55">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
