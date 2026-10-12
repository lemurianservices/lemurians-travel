import { Heart } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { scrollToId } from '../lib/gsap.js'
import { SITE, DESTINATIONS } from '../data/content.js'

const socials = [
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { t, lang } = useLang()
  const explore = [
    { id: '#about', label: t.nav.about },
    { id: '#cars', label: t.nav.cars },
    { id: '#destinations', label: t.nav.dest },
    { id: '#faq', label: t.nav.faq },
    { id: '#contact', label: t.contact.badge },
  ]

  return (
    <footer className="border-t border-gold/10 bg-ink pb-10 pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-widest text-cream">LEMURIANS</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/50">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ label, icon }) => (
              <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cream/60 transition hover:border-gold hover:bg-gold hover:text-ink">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-sm uppercase tracking-[0.25em] text-gold">{t.footer.explore}</h4>
          <ul className="space-y-2.5">
            {explore.map((l) => (
              <li key={l.id}>
                <button onClick={() => scrollToId(l.id)} className="text-sm text-cream/60 transition hover:text-gold">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-sm uppercase tracking-[0.25em] text-gold">{t.footer.tops}</h4>
          <ul className="space-y-2.5">
            {DESTINATIONS.slice(0, 5).map((d) => (
              <li key={d.id}>
                <button onClick={() => scrollToId('#destinations')} className="text-sm text-cream/60 transition hover:text-gold">
                  {d.title[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 px-5 pt-6 text-xs text-cream/40 sm:flex-row sm:px-8">
        <span>© 2026 {SITE.name}. {t.footer.rights}</span>
        <span className="flex items-center gap-1.5">
          {t.footer.made} <Heart className="h-3.5 w-3.5 fill-red-500/70 text-red-500/70" />
        </span>
      </div>
    </footer>
  )
}