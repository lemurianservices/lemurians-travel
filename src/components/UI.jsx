export function SectionHeading({ badge, title, subtitle, center = true, light = false }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {badge && (
        <span data-reveal className="mb-4 inline-block text-xs uppercase tracking-[0.4em] text-gold">
          {badge}
        </span>
      )}
      <h2
        data-reveal
        className={`font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] ${
          light ? 'text-ink' : 'text-cream'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className={`mx-auto mt-5 max-w-xl text-base leading-relaxed ${light ? 'text-ink/70' : 'text-cream/65'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
