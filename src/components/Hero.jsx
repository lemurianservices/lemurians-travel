import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, Compass, Star } from 'lucide-react'
import { gsap, scrollToId } from '../lib/gsap.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { HERO_SLIDES } from '../data/content.js'

export default function Hero({ ready }) {
  const { t, lang } = useLang()
  const [slide, setSlide] = useState(0)
  const [showCaption, setShowCaption] = useState(false)
  const scope = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000)
    return () => clearInterval(id)
  }, [])

  // Cache le texte dès le montage (aucun flash quand le préchargeur se lève)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-line span', { yPercent: 115 })
      gsap.set(['.hero-badge', '.hero-sub', '.hero-cta', '.hero-stat'], { opacity: 0, y: 24 })
      gsap.set('.hero-copy', { opacity: 1, y: 0 })
    }, scope)
    return () => ctx.revert()
  }, [])

  // Intro + effacement automatique (rejouable via le bouton « Accueil »)
  useEffect(() => {
    if (!ready) return
    let ctx
    const play = () => {
      if (ctx) ctx.revert()
      setSlide(0)
      setShowCaption(false)

      ctx = gsap.context(() => {
        gsap.set('.hero-copy', { opacity: 1, y: 0, pointerEvents: 'auto' })
        gsap.set('.hero-line span', { yPercent: 115 })
        gsap.set(['.hero-badge', '.hero-sub', '.hero-cta', '.hero-stat'], { opacity: 0, y: 24 })

        const tl = gsap.timeline({ delay: 0.15 })
        tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .to('.hero-line span', { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
          .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
          .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
          .to('.hero-stat', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
          .to('.hero-copy', {
            opacity: 0,
            y: -34,
            duration: 1.6,
            ease: 'power2.inOut',
            delay: 5,
            onComplete: () => {
              gsap.set('.hero-copy', { pointerEvents: 'none' })
              setShowCaption(true)
            },
          })
      }, scope)
    }

    play()
    const onReplay = () => play()
    window.addEventListener('hero:replay', onReplay)
    return () => {
      window.removeEventListener('hero:replay', onReplay)
      if (ctx) ctx.revert()
    }
  }, [ready])

  const current = HERO_SLIDES[slide]

  return (
    <section id="home" ref={scope} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Fond : diaporama (fondu simple, sans zoom) */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-out ${
            i === slide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${s.src})` }}
        />
      ))}

      {/* Voiles légers : on garde les images bien lisibles */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/70 to-transparent" />

      {/* Noms des lieux — apparaissent à droite quand le titre s'efface */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-[11] -translate-y-1/2 text-right sm:right-12">
        {showCaption && (
          <div key={`${slide}-${lang}`} className="hero-caption">
            <span className="block text-[0.65rem] uppercase tracking-[0.45em] text-gold">{current.region[lang]}</span>
            <span
              className="mt-2 block font-display text-2xl italic leading-tight text-cream sm:text-4xl"
              style={{ textShadow: '0 2px 22px rgba(0,0,0,0.7)' }}
            >
              {current.name[lang]}
            </span>
          </div>
        )}
      </div>

      {/* Texte d'accueil */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-32 sm:px-8 sm:pt-36">
        <div className="hero-copy">
          <span className="hero-badge mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur">
            <Compass className="h-3.5 w-3.5" />
            {t.hero.kicker}
          </span>

          <h1 className="hero-title font-display text-[clamp(2.6rem,8vw,6.5rem)] font-semibold leading-[0.98] text-cream">
            <span className="hero-line line-mask">
              <span className="block">{t.hero.title1}</span>
            </span>
            <span className="hero-line line-mask">
              <span className="block italic text-gold-gradient">{t.hero.title2}</span>
            </span>
            <span className="hero-line line-mask">
              <span className="block">{t.hero.title3}</span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-xl text-lg leading-relaxed text-cream/90">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToId('#contact')}
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldlight px-7 py-3.5 font-semibold text-ink transition hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)]"
            >
              {t.hero.cta1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId('#how')}
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream backdrop-blur transition hover:border-gold hover:text-gold"
            >
              <Play className="h-4 w-4" />
              {t.hero.cta2}
            </button>
          </div>
        </div>
      </div>

      {/* Pastilles */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-8 bg-gold' : 'w-1.5 bg-cream/30'}`}
          />
        ))}
      </div>

      {/* Indicateur de défilement */}
      <button
        onClick={() => scrollToId('#about')}
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-3 text-xs uppercase tracking-[0.3em] text-cream/60 hover:text-gold sm:flex"
      >
        {t.hero.scroll}
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-cream/30">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold" style={{ animation: 'scrollcue 1.8s ease-in-out infinite' }} />
        </span>
      </button>

      {/* Marque décorative */}
      <div className="pointer-events-none absolute bottom-24 right-10 hidden items-center gap-2 text-gold/40 md:flex">
        <Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" />
      </div>
    </section>
  )
}