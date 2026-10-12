import { useEffect, useRef, useState } from 'react'
import { Menu, X, Globe, MessageCircle } from 'lucide-react'
import { gsap, scrollToId } from '../lib/gsap.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { IMG, SITE } from '../data/content.js'

export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const navbar = useRef(null)
  const overlay = useRef(null)
  const [open, setOpen] = useState(false)
  const links = [
    { id: '#home', label: t.nav.home },
    { id: '#about', label: t.nav.about },
    { id: '#cars', label: t.nav.cars },
    { id: '#destinations', label: t.nav.dest },
    { id: '#regions', label: t.nav.regions },
    { id: '#faq', label: t.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => {
      if (!navbar.current) return
      navbar.current.classList.toggle('glass', window.scrollY > 40)
      navbar.current.classList.toggle('py-3', window.scrollY > 40)
      navbar.current.classList.toggle('py-5', window.scrollY <= 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!overlay.current) return
    if (open) {
      gsap.fromTo(overlay.current, { clipPath: 'circle(0% at 92% 6%)' }, { clipPath: 'circle(150% at 92% 6%)', duration: 0.7, ease: 'power3.inOut' })
      gsap.fromTo(overlay.current.querySelectorAll('a'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.2 })
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    if (id === '#home') window.dispatchEvent(new CustomEvent('hero:replay'))
    setTimeout(() => scrollToId(id), open ? 200 : 0)
  }

  return (
    <>
      <header
        ref={navbar}
        className="fixed inset-x-0 top-0 z-[110] py-5 transition-all duration-500"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <button onClick={() => go('#home')} className="flex items-center gap-3" aria-label={SITE.name}>
            <img src={IMG.logo} alt="" className="h-10 w-10 rounded-full object-cover ring-1 ring-gold/40" />
            <span className="font-display text-lg tracking-widest text-cream">LEMURIANS</span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="group relative text-sm tracking-wide text-cream/80 transition-colors hover:text-gold"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold transition hover:bg-gold/10"
              aria-label="Switch language"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldlight px-5 py-2.5 text-sm font-semibold text-ink transition hover:shadow-[0_8px_30px_rgba(212,175,55,0.45)] sm:flex"
            >
              <MessageCircle className="h-4 w-4" />
              {t.nav.contact}
            </a>

            <button
              onClick={() => setOpen(true)}
              className="text-cream lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div ref={overlay} className="fixed inset-0 z-[130] flex flex-col bg-forest2/95 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-display text-lg tracking-widest text-cream">LEMURIANS</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-cream">
              <X className="h-8 w-8" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-5 px-8">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="text-left font-display text-3xl text-cream">
                {l.label}
              </button>
            ))}
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldlight px-6 py-3 font-semibold text-ink"
            >
              <MessageCircle className="h-5 w-5" />
              {t.nav.contact}
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
