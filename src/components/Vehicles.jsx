import { Car, Snowflake, Wrench, Users, ExternalLink } from 'lucide-react'
import { SectionHeading } from './UI.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG, SITE } from '../data/content.js'

const icons = [Car, Snowflake, Wrench, Users]

export default function Vehicles() {
  const { t } = useLang()
  const [big, ...rest] = IMG.cars

  return (
    <section id="cars" className="relative bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading badge={t.cars.badge} title={t.cars.title} subtitle={t.cars.subtitle} />

        <p data-reveal className="mx-auto mt-6 max-w-2xl text-center text-sm text-cream/55">
          {t.cars.partner}
          <a
            href={SITE.partnerUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 font-semibold text-gold hover:underline"
          >
            Madeinmada <ExternalLink className="h-3 w-3" />
          </a>
        </p>

        {/* Gallery */}
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <div data-reveal className="group overflow-hidden rounded-[24px] border border-gold/15">
            <img src={big} alt="Vehicle" className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[480px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {rest.map((src, i) => (
              <div key={src} data-reveal data-reveal-delay={String(i * 0.06)} className="group overflow-hidden rounded-[20px] border border-gold/15">
                <img src={src} alt={`Vehicle ${i + 2}`} className="h-[150px] w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-[232px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.cars.features.map((f, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={i} data-reveal data-reveal-delay={String(i * 0.06)} className="glass rounded-2xl p-6 transition hover:border-gold/40">
                <Icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-lg text-cream">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/60">{f.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
