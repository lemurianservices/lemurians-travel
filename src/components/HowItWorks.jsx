import { SectionHeading } from './UI.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function HowItWorks() {
  const { t } = useLang()
  return (
    <section id="how" className="relative bg-ink py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading badge={t.how.badge} title={t.how.title} subtitle={t.how.subtitle} />

        <div className="relative mt-16">
          <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {t.how.steps.map((s, i) => (
              <div
                key={i}
                data-reveal
                data-reveal-delay={String(i * 0.08)}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-ink font-display text-xl text-gold shadow-[0_0_0_6px_rgba(6,17,11,1)]">
                  0{i + 1}
                </div>
                <h3 className="mt-6 font-display text-xl text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
