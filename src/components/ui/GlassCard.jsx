import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function GlassCard({ children, className = '', ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={`glass-panel relative overflow-hidden ${className}`}
      {...rest}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-stRed/5 via-transparent to-stBlue/5 opacity-60" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

GlassCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}
