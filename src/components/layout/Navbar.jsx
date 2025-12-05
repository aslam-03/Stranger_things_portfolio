import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { scrollToId } from '../../utils/scroll'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'certifications',
  'contact'
]

export default function Navbar({ themeMode, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-30 backdrop-blur-xl transition-all duration-500 ${
        scrolled ? 'bg-black/70 border-b border-white/10 py-2' : 'bg-black/30 py-4'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs uppercase tracking-[0.35em]">
        <button
          onClick={() => scrollToId('home')}
          className="font-display text-lg tracking-[0.5em] text-stRed title-outline"
        >
          SUMAN
        </button>
        <div className="hidden gap-6 text-stCream/70 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToId(link)}
              className="hover:text-stCream transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
        <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
      </nav>
    </motion.header>
  )
}

Navbar.propTypes = {
  themeMode: PropTypes.oneOf(['normal', 'upside-down']).isRequired,
  onToggleTheme: PropTypes.func.isRequired
}
