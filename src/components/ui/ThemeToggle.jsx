import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ThemeToggle({ mode, onToggle }) {
  const isUpsideDown = mode === 'upside-down'
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="relative flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs tracking-[0.3em] uppercase"
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-stCream/70">Mode</span>
      <span className={`font-semibold ${isUpsideDown ? 'text-stPurple' : 'text-stRed'}`}>
        {isUpsideDown ? 'Upside Down' : 'Normal'}
      </span>
      <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-stRed/20 via-transparent to-stBlue/20 blur-xl" />
    </motion.button>
  )
}

ThemeToggle.propTypes = {
  mode: PropTypes.oneOf(['normal', 'upside-down']).isRequired,
  onToggle: PropTypes.func.isRequired
}
