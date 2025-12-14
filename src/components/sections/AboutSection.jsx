import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { aboutContent, heroContent } from '../../data/content'
import SectionTitle from '../ui/SectionTitle'
import TypewriterTerminal from '../ui/TypewriterTerminal'

export default function AboutSection() {
  const terminalLines = useMemo(
    () => [
      `ROLE: ${heroContent.role}`,
      `LOCATION: ${heroContent.location}`,
      `SPECIALIZATION: ${aboutContent.specializations.join(' | ')}`
    ],
    []
  )

  return (
    <section id="about" className="py-24">
      <SectionTitle label="Chapter 01" subtitle="About the Explorer" />
      <motion.div
        className="neon-frame mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div className="flex flex-col gap-10 p-4 md:flex-row md:items-center md:p-8">
          {/* Portrait / Visual Side */}
          <div className="w-full shrink-0 md:w-1/3">
            <div className="portrait-card aspect-[4/5] w-full max-w-sm mx-auto shadow-2xl">
              {heroContent.portraitUrl ? (
                <img
                  src={heroContent.portraitUrl}
                  alt={heroContent.portraitAlt || `${heroContent.name} portrait`}
                  loading="lazy"
                  className="portrait-card__img h-full w-full object-cover"
                />
              ) : (
                <div className="portrait-card__img flex h-full w-full flex-col items-center justify-center gap-4 bg-black/40 p-6 text-center backdrop-blur-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-stRed/50 bg-stRed/10 shadow-[0_0_15px_rgba(var(--theme-r),var(--theme-g),var(--theme-b),0.3)]">
                    <svg className="h-8 w-8 text-stRed opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-stCream/70">
                    Replace Image Here
                  </div>
                </div>
              )}
              <div className="portrait-card__glow" />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full space-y-6 md:w-2/3">
            <p className="text-lg leading-relaxed text-stCream/80">{aboutContent.paragraph}</p>
            <TypewriterTerminal lines={terminalLines} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
