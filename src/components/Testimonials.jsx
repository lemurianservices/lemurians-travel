import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionHeading } from './UI.jsx'
import { gsap } from '../lib/gsap.js'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Testimonials() {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const inner = useRef(null)
  const n = t.testimonials.items.length

  const animateTo = (next) => {
    setI((next + n) % n)
  }

  useEffect(() => {
    if (!inner.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { opacity: 0, y: 24, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      )
    }, inner)
    return () => ctx.revert()
  }, [i])

  useEffect(() => {
    const id = setInterval(() => setI((s) => (s + 1) % n), 7000)
    return () => clearInterval(id)
  }, [n])

  const item = t.testimonials.items[i]

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-display text-[22rem] leading-none text-white/[0.03]">"</div>
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <SectionHeading badge={t.testimonials.badge} title={t.testimonials.title} subtitle={t.testimonials.subtitle} />

        <div ref={inner} className="mt-12">
          <div className="flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star key={s} className="h-5 w-5 fill-gold" />
            ))}
          </div>
          <p className="mt-7 font-display text-xl leading-relaxed text-cream/90 sm:text-2xl">"{item.text}"</p>
          <div className="mt-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-goldlight font-display text-lg text-ink">
              {item.name[0]}
            </div>
            <div className="mt-3 font-semibold text-gold">{item.name}</div>
            <div className="mt-0.5 text-xs uppercase tracking-widest text-cream/45">{item.meta}</div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button onClick={() => animateTo(i - 1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold hover:text-ink">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {t.testimonials.items.map((_, d) => (
              <button
                key={d}
                onClick={() => animateTo(d)}
                aria-label={`Testimonial ${d + 1}`}
                className={`h-1.5 rounded-full transition-all ${d === i ? 'w-7 bg-gold' : 'w-1.5 bg-cream/25'}`}
              />
            ))}
          </div>

          <button onClick={() => animateTo(i + 1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold hover:text-ink">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}