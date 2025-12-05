import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function SectionTitle({ label, subtitle }) {
  return (
    <div className="mb-10">
      <motion.p
        className="text-sm tracking-[0.5em] text-stBlue uppercase"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 0.8, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {label}
      </motion.p>
      <motion.h2
        className="section-title text-2xl md:text-3xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.45, 0, 0.55, 1] }}
      >
        {subtitle}
      </motion.h2>
    </div>
  )
}

SectionTitle.propTypes = {
  label: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}
