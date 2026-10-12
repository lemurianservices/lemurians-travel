import { Handshake, Building2, Trees } from 'lucide-react'
import { SectionHeading } from './UI.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

const icons = [Handshake, Building2, Trees]

export default function Partners() {
  const { t } = useLang()
  return (
    <section className="relative bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading badge={t.partners.badge} title={t.partners.title} subtitle={t.partners.subtitle} />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {t.partners.items.map((p, i) => {
            const Icon = icons[i % icons.length]
            return (
              <div key={i} data-reveal data-reveal-delay={String(i * 0.08)} className="glass group rounded-3xl p-8 transition hover:-translate-y-2 hover:border-gold/40">
                <Icon className="h-9 w-9 text-gold" />
                <h3 className="mt-5 font-display text-xl text-cream">{p.title}</h3>
                <p className="mt-2 !text-left text-sm leading-relaxed text-cream/60">{p.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}