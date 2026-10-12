import { createContext, useContext, useEffect, useState } from 'react'
import { CONTENT } from '../data/content.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('lemurians-lang') || 'fr'
    }
    return 'fr'
  })

  useEffect(() => {
    try {
      localStorage.setItem('lemurians-lang', lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'))

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t: CONTENT[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
