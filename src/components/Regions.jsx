import { SectionHeading } from './UI.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG } from '../data/content.js'

const foodMap = { centre: 'romazava', ouest: 'ravitoto', nord: 'langouste', sudouest: 'koba', est: 'fruits' }

export default function Regions() {
  const { t } = useLang()

  return (
    <section id="regions" className="relative overflow-hidden bg-forest py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-ink/60 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading badge={t.regions.badge} title={t.regions.title} subtitle={t.regions.subtitle} />

        <div className="mt-16 space-y-16 lg:space-y-24">
          {t.regions.items.map((r, i) => {
            const reverse = i % 2 === 1
            return (
              <div key={r.key} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div data-reveal className={`group relative overflow-hidden rounded-[26px] border border-gold/15 ${reverse ? 'lg:order-2' : ''}`}>
                  <img
                    src={IMG.regions[r.key]}
                    alt={r.title}
                    className="h-64 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 sm:h-80 lg:h-[420px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <img
                    src={IMG.food[foodMap[r.key]]}
                    alt=""
                    className="absolute bottom-6 right-6 h-20 w-20 rounded-2xl border-2 border-gold/40 object-cover shadow-2xl sm:h-24 sm:w-24"
                  />
                </div>

                <div data-reveal className={reverse ? 'lg:order-1' : ''}>
                  <span className="font-display text-5xl text-gold/15">0{i + 1}</span>
                  <h3 className="mt-1 font-display text-2xl text-cream sm:text-3xl">{r.title}</h3>
                  <p className="mt-4 leading-relaxed text-cream/65">{r.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-gold/25 bg-white/5 px-4 py-1.5 text-xs font-medium text-gold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}