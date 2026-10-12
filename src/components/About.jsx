import { ArrowRight, MapPin, Leaf, Route, Heart } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { scrollToId } from '../lib/gsap.js'
import { IMG } from '../data/content.js'

const icons = [MapPin, Route, Heart]

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-forest2/40 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-2 lg:order-1">
          <div data-parallax="0.08" className="overflow-hidden rounded-[28px] border border-gold/15">
            <img src={IMG.regions.centre} alt="Madagascar highlands" className="h-[420px] w-full object-cover sm:h-[520px]" />
          </div>
          <div className="absolute -bottom-6 -right-3 w-56 rounded-2xl border border-gold/20 bg-forest/95 p-5 backdrop-blur sm:right-6">
            <div className="flex items-center gap-3">
              <Leaf className="h-8 w-8 text-gold" />
              <div>
                <div className="font-display text-2xl text-cream">100% local</div>
                <div className="text-xs uppercase tracking-widest text-cream/50">Guides de Madagascar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <span data-reveal className="mb-4 inline-block text-xs uppercase tracking-[0.4em] text-gold">
            {t.about.badge}
          </span>
          <h2 data-reveal className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight text-cream">
            {t.about.title}
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-cream/80">
            {t.about.lead}
          </p>
          <p data-reveal className="mt-4 leading-relaxed text-cream/60">
            {t.about.body}
          </p>

          <div className="mt-10 space-y-6">
            {t.about.features.map((f, i) => {
              const Icon = icons[i % icons.length]
              return (
                <div key={i} data-reveal data-reveal-delay={String(i * 0.08)} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-gold/25 bg-white/5">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-cream">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/60">{f.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            data-reveal
            onClick={() => scrollToId('#contact')}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldlight px-6 py-3 font-semibold text-ink transition hover:shadow-[0_12px_40px_rgba(212,175,55,0.45)]"
          >
            {t.hero.cta1}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
