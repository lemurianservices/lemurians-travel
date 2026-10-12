import { useState } from 'react'
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react'
import { SectionHeading } from './UI.jsx'
import { useLang } from '../i18n/LanguageContext.jsx'
import { SITE } from '../data/content.js'

const inputCls =
  'w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition focus:border-gold focus:bg-white/[0.07]'

export default function Contact() {
  const { t } = useLang()
  const [sent, setSent] = useState(false)
  const f = t.contact.form

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    e.target.reset()
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-ink via-forest2 to-ink py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle} center={false} />

          <div className="mt-10 space-y-6">
            <a href={`mailto:${SITE.email}`} className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-gold/40">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-cream/45">{t.contact.email}</div>
                <div className="font-medium text-cream group-hover:text-gold">{SITE.email}</div>
              </div>
            </a>

            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener" className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-[#25d366]/50">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#25d366]/20 text-[#25d366]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-cream/45">{t.contact.whatsapp}</div>
                <div className="font-medium text-cream group-hover:text-[#25d366]">{SITE.whatsappDisplay}</div>
              </div>
            </a>

            <div className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-cream/45">{t.contact.locationLabel}</div>
                <div className="font-medium text-cream">{SITE.location}</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="glass h-fit rounded-3xl p-6 sm:p-8" data-reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="name" placeholder={f.name} className={inputCls} />
            <input required type="email" name="email" placeholder={f.email} className={inputCls} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input name="dates" placeholder={f.dates} className={inputCls} />
            <select name="travelers" required defaultValue="" className={`${inputCls} appearance-none`}>
              <option value="" disabled>
                {f.select}
              </option>
              {f.persons.map((p) => (
                <option key={p} value={p} className="bg-ink">
                  {p}
                </option>
              ))}
            </select>
          </div>
          <textarea name="message" rows="5" placeholder={f.message} className={`${inputCls} mt-4 resize-none`} />
          <button
            type="submit"
            className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-goldlight py-4 font-semibold text-ink transition hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)]"
          >
            {f.submit}
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          {sent && <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-goldlight">{t.contact.success}</p>}
        </form>
      </div>
    </section>
  )
}