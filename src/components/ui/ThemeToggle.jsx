import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function ThemeToggle({ mode, themeMode, onToggle, variant = 'standard', className = '' }) {
  const isUpsideDown = (mode || themeMode) === 'upside-down'

  // Compact variant for navbar
  if (variant === 'compact') {
    return (
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isUpsideDown ? 'Switch to normal mode' : 'Switch to upside down mode'}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border backdrop-blur-2xl transition-all duration-300 ${
          isUpsideDown
            ? 'bg-[#061028]/60 border-[#4cc9f0]/50 text-[#4cc9f0] hover:bg-[#0d1d36]/70 hover:shadow-[0_0_20px_rgba(76,201,240,0.4)]'
            : 'bg-[#180205]/60 border-[#e50914]/50 text-[#ff6b81] hover:bg-[#240305]/70 hover:shadow-[0_0_20px_rgba(229,9,20,0.4)]'
        } ${className}`}
      >
        <span className="relative flex items-center justify-center text-[0.6rem] font-bold uppercase tracking-wider">
          {isUpsideDown ? 'UD' : 'NM'}
        </span>
      </motion.button>
    )
  }

  if (variant === 'circle') {
    const circleAccent = isUpsideDown
      ? 'bg-gradient-to-br from-[#061028]/90 via-[#071326]/80 to-[#092645]/85 shadow-[0_0_28px_rgba(76,201,240,0.45)] border-[#4cc9f0]/40'
      : 'bg-gradient-to-br from-[#180205]/90 via-[#200308]/80 to-[#33070d]/80 shadow-[0_0_28px_rgba(229,9,20,0.45)] border-[#e50914]/35'

    return (
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={isUpsideDown ? 'Switch to normal mode' : 'Switch to upside down mode'}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border backdrop-blur-2xl transition-all duration-300 ${circleAccent} ${className}`}
      >
        <span
          className={`absolute inset-[2px] rounded-full border border-white/10 opacity-60 ${
            isUpsideDown ? 'shadow-[0_0_25px_rgba(76,201,240,0.35)]' : 'shadow-[0_0_25px_rgba(229,9,20,0.35)]'
          }`}
        />
        <span className="relative flex h-7 w-7 items-center justify-center">
          <span
            className={`absolute h-full w-full rounded-full blur-lg opacity-70 ${
              isUpsideDown ? 'bg-[#4cc9f0]/50' : 'bg-[#e50914]/50'
            }`}
          />
          <span
            className={`relative inline-flex h-3/4 w-3/4 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[0.65rem] font-semibold uppercase tracking-[0.24em] ${
              isUpsideDown ? 'text-[#4cc9f0]' : 'text-[#ff6b81]'
            }`}
          >
            {isUpsideDown ? 'UD' : 'NM'}
          </span>
        </span>
      </motion.button>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className={`relative flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs tracking-[0.3em] uppercase backdrop-blur-xl transition-all duration-300 ${
        isUpsideDown ? 'bg-[#071326]/70 text-[#dbebff]' : 'bg-black/40 text-stCream'
      } ${className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
    >
      <span className="text-stCream/70">Mode</span>
      <span className={`font-semibold ${isUpsideDown ? 'text-[#4cc9f0]' : 'text-stRed'}`}>
        {isUpsideDown ? 'Upside Down' : 'Normal'}
      </span>
      <span
        className={`absolute inset-0 -z-10 rounded-full blur-xl transition-colors duration-300 ${
          isUpsideDown
            ? 'bg-[radial-gradient(circle_at_center,_rgba(76,201,240,0.18),_transparent_70%)]'
            : 'bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.18),_transparent_70%)]'
        }`}
      />
    </motion.button>
  )
}

ThemeToggle.propTypes = {
  mode: PropTypes.oneOf(['normal', 'upside-down']),
  themeMode: PropTypes.oneOf(['normal', 'upside-down']),
  onToggle: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['standard', 'circle', 'compact']),
  className: PropTypes.string
}
