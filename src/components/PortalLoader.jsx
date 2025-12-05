import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { scrollToId } from '../utils/scroll'

const letters = ['S', 'U', 'M', 'A', 'N']

const letterVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.6 + index * 0.2,
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  })
}

export default function PortalLoader({ onFinish }) {
  const [flashPhase, setFlashPhase] = useState(false)
  const finishRef = useRef(onFinish)

  useEffect(() => {
    finishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const flashTimer = setTimeout(() => setFlashPhase(true), 2500)
    const finishTimer = setTimeout(() => {
      scrollToId('home')
      finishRef.current?.()
    }, 2800)

    return () => {
      clearTimeout(flashTimer)
      clearTimeout(finishTimer)
    }
  }, [])

  return (
    <motion.div
      className={`portal-loader ${flashPhase ? 'portal-loader--flash' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: flashPhase ? 0 : 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="portal-loader__gradient" />
      <div className="portal-loader__vignette" />
      <div className="portal-loader__noise" />

      <div className="portal-frame">
        <div className="portal-frame__lines">
          <span className="portal-line portal-line--top" />
          <span className="portal-line portal-line--bottom" />
          <span className="portal-line portal-line--left" />
          <span className="portal-line portal-line--right" />
        </div>
        <div className="portal-word">
          {letters.map((letter, index) => (
            <motion.span key={letter} custom={index} variants={letterVariants} initial="initial" animate="animate" className="portal-letter">
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="portal-tagline"
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.7em' }}
          transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
        >
          Spark, sculpt, release.
        </motion.p>
      </div>

      {flashPhase && <div className="portal-flash" />}
    </motion.div>
  )
}
