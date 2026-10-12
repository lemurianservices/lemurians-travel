import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SectionHeading } from './UI.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div data-reveal className="border-b border-white/10">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
        <h3 className="font-display text-lg text-cream sm:text-xl">{q}</h3>
        <span
          className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold/30 text-gold transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          <p className="pb-6 pr-10 leading-relaxed text-cream/60">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLang()
  return (
    <section id="faq" className="relative bg-ink py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading badge={t.faq.badge} title={t.faq.title} center={false} />
        </div>
        <div className="lg:pt-10">
          {t.faq.items.map((f, i) => (
            <Item key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  )
}