import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, X, MapPin, Check, Clock, Sparkles, Compass } from 'lucide-react'
import { SectionHeading } from './UI.jsx'
import { gsap, scrollToId } from '../lib/gsap.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { DESTINATIONS } from '../data/content.js'

function DestModal({ dest, onClose }) {
  const { t, lang } = useLang()
  const overlay = useRef(null)
  const panel = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const inTl = gsap.timeline()
    inTl.fromTo(overlay.current, { opacity: 0 }, { opacity: 1, duration: 0.35 })
      .fromTo(panel.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.15')

    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = () => {
    gsap.to(panel.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(overlay.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.05,
      onComplete: onClose,
    })
  }

  const book = () => {
    close()
    setTimeout(() => scrollToId('#contact'), 350)
  }

  return (
    <div ref={overlay} className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/85 p-3 backdrop-blur-sm sm:p-6" onClick={(e) => e.target === overlay.current && close()}>
      <div ref={panel} className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[26px] border border-gold/20 bg-forest text-cream">
        <button onClick={close} className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur transition hover:bg-gold hover:text-ink" aria-label={t.dest.close}>
          <X className="h-5 w-5" />
        </button>

        <div data-lenis-prevent className="max-h-[92vh] overflow-y-auto overscroll-contain">
          {/* Hero */}
          <div className="relative h-64 sm:h-80">
            <img src={dest.image} alt={dest.title[lang]} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-widest text-ink">
                <MapPin className="h-3 w-3" /> {dest.region[lang]}
              </span>
              <h3 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-cream">{dest.title[lang]}</h3>
              <p className="mt-1 font-display italic text-goldlight/90">{dest.slogan[lang]}</p>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="leading-relaxed text-cream/80">{dest.description[lang]}</p>

              <h4 className="mt-8 flex items-center gap-2 font-display text-xl text-cream">
                <Sparkles className="h-4 w-4 text-gold" /> {t.dest.highlights}
              </h4>
              <ul className="mt-4 space-y-2">
                {dest.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-cream/75">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-gold" /> {h[lang]}
                  </li>
                ))}
              </ul>

              <h4 className="mt-8 flex items-center gap-2 font-display text-xl text-cream">
                <Compass className="h-4 w-4 text-gold" /> {t.dest.experiences}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {dest.experiences.map((e, i) => (
                  <span key={i} className="rounded-full border border-gold/25 bg-white/5 px-4 py-2 text-sm text-cream/80">
                    {e[lang]}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div className="h-fit rounded-2xl border border-gold/25 bg-gradient-to-br from-white/[0.07] to-transparent p-6">
              <div className="flex items-center gap-2 text-sm text-cream/60">
                <Clock className="h-4 w-4 text-gold" /> {dest.pricing.duration[lang]}
              </div>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-xs uppercase tracking-widest text-cream/50">{t.dest.from}</span>
                <span className="font-display text-4xl text-gold">{dest.pricing.price}</span>
              </div>
              <button
                onClick={book}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-gold to-goldlight py-3.5 font-semibold text-ink transition hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)]"
              >
                {t.dest.book}
              </button>
              <p className="mt-3 text-center text-xs text-cream/45">{t.contact.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Destinations() {
  const { t, lang } = useLang()
  const [active, setActive] = useState(null)

  return (
    <section id="destinations" className="relative bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading badge={t.dest.badge} title={t.dest.title} subtitle={t.dest.subtitle} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <button
              key={d.id}
              data-reveal
              data-reveal-delay={String((i % 3) * 0.08)}
              onClick={() => setActive(d)}
              className="group relative h-[420px] overflow-hidden rounded-[24px] border border-gold/15 text-left"
            >
              <img src={d.image} alt={d.title[lang]} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent transition-opacity group-hover:from-ink/95" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">{d.tag[lang]}</span>
                <h3 className="mt-2 font-display text-2xl text-cream">{d.title[lang]}</h3>
                <div className="mt-3 flex items-center gap-2 text-sm text-cream/0 transition-all duration-500 group-hover:text-cream/80">
                  {t.dest.details}
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <span className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-gold/90 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && <DestModal dest={active} onClose={() => setActive(null)} />}
    </section>
  )
}
