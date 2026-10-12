import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export { gsap, ScrollTrigger }

/** Smooth momentum scrolling wired into the GSAP ticker. */
export function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 1,
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  lenis.on('scroll', ScrollTrigger.update)
  const onTick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)

  // Keep trigger positions accurate once everything (images/fonts) settles.
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  const t = setTimeout(refresh, 800)

  return () => {
    gsap.ticker.remove(onTick)
    window.removeEventListener('load', refresh)
    clearTimeout(t)
    lenis.destroy()
  }
}

export function scrollToId(id) {
  const el = typeof id === 'string' ? document.querySelector(id) : id
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 76
  gsap.to(window, { duration: 1, ease: 'power3.inOut', scrollTo: { y: top, autoKill: true } })
}

/**
 * Reveals every [data-reveal] inside the given ref on scroll,
 * plus subtle parallax for [data-parallax] elements.
 */
export function useScrollReveal(ref, deps = []) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || '0')
        gsap.fromTo(
          el,
          { y: 46, opacity: 0, filter: 'blur(6px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.12')
        gsap.to(el, {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
