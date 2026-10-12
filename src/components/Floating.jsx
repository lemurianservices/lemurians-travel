import { useEffect, useState } from 'react'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { SITE } from '../data/content.js'

export default function Floating() {
  const { t } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="group fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-ink shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs text-cream opacity-0 shadow-lg transition group-hover:opacity-100">
          {t.wa.tooltip}
        </span>
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-[5.5rem] z-[100] flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-ink/80 text-gold backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  )
}