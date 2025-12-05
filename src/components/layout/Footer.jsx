import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="mt-20 border-t border-white/5 pt-8 text-center text-xs tracking-[0.3em] text-white/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      © {new Date().getFullYear()} Suman · Built in the Upside Down
    </motion.footer>
  )
}
