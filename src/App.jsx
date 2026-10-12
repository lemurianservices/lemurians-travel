import { useEffect, useRef, useState } from 'react'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { initSmoothScroll, useScrollReveal } from './lib/gsap.js'
import Preloader from './components/Preloader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Vehicles from './components/Vehicles.jsx'
import Destinations from './components/Destinations.jsx'
import Regions from './components/Regions.jsx'
import Partners from './components/Partners.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Floating from './components/Floating.jsx'

function Site() {
  const [ready, setReady] = useState(false)
  const root = useRef(null)

  useEffect(() => initSmoothScroll(), [])
  useScrollReveal(root)

  return (
    <div ref={root} className="grain relative overflow-x-clip bg-ink font-sans text-cream">
      <ScrollProgress />
      <Preloader onDone={() => setReady(true)} />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <HowItWorks />
        <Vehicles />
        <Destinations />
        <Regions />
        <Partners />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}