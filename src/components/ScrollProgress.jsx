import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.js'

export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (bar.current) gsap.set(bar.current, { scaleX: self.progress })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div
      ref={bar}
      style={{ transform: 'scaleX(0)' }}
      className="fixed left-0 top-0 z-[120] h-[3px] w-full origin-left bg-gradient-to-r from-gold via-goldlight to-gold"
    />
  )
}
