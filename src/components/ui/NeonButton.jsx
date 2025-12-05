import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function NeonButton({ children, variant = 'primary', onClick, href }) {
  const baseClasses =
    'neon-button rounded-full border border-white/15 shadow-neon transition-all duration-300'
  const palette =
    variant === 'ghost'
      ? 'bg-black/30 text-stCream'
      : 'bg-stRed text-white'

  if (href) {
    return (
      <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href={href} onClick={onClick} className={`${baseClasses} ${palette}`}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClick} className={`${baseClasses} ${palette}`}>
      {children}
    </motion.button>
  )
}

NeonButton.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'ghost']),
  onClick: PropTypes.func,
  href: PropTypes.string
}
