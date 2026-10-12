import { useLang } from '../i18n/LanguageContext.jsx'

export default function Marquee() {
  const { t } = useLang()
  const group = (k) => (
    <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
      {t.marquee.map((it, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl text-cream/75 sm:text-3xl">{it}</span>
          <span className="text-lg text-gold">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-forest py-6">
      <div className="flex w-max animate-marquee">
        {group(0)}
        {group(1)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-forest to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-forest to-transparent" />
    </div>
  )
}
