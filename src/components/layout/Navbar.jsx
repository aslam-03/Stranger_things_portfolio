import { useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { scrollToId } from '../../utils/scroll'
import GooeyNav from '../ui/GooeyNav'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const isUpsideDown = themeMode === 'upside-down'

  // Responsive breakpoints - activate burger menu earlier to prevent clipping
  const isMobile = windowSize.width < 1100  // Increased from 768px
  const isTablet = windowSize.width >= 1100 && windowSize.width < 1280
  const isDesktop = windowSize.width >= 1280

  const navItems = useMemo(
    () =>
      navLinks.map((link) => {
        const label = link
          .split('-')
          .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
          .join(' ')
        return {
          label,
          href: `#${link}`,
          onSelect: () => {
            scrollToId(link)
            closeMenu()
          }
        }
      }),
    [closeMenu]
  )

  const accentColor = isUpsideDown ? '#4cc9f0' : '#e50914'
  const accentGlowColor = isUpsideDown ? 'rgba(76, 201, 240, 0.55)' : 'rgba(229, 9, 20, 0.55)'
  const accentTextColor = isUpsideDown ? 'rgba(224, 242, 255, 0.96)' : 'rgba(255, 243, 239, 0.96)'
  const focusRingColor = isUpsideDown ? 'rgba(76, 201, 240, 0.65)' : 'rgba(229, 9, 20, 0.6)'
  const inactiveTextColor = isUpsideDown
    ? 'rgba(214, 236, 255, 0.78)'
    : 'rgba(243, 228, 207, 0.78)'

  const headerPadding = scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'
  const navBackgroundClass = scrolled ? 'bg-black/60 border-white/25' : 'bg-black/40 border-white/15'
  const navShadow = scrolled
    ? `0 10px 28px rgba(0, 0, 0, 0.55), 0 0 18px ${accentGlowColor}`
    : `0 18px 45px rgba(0, 0, 0, 0.55), 0 0 24px ${accentGlowColor}`

  // Dynamic grid sizing based on viewport
  const getGridConfig = () => {
    if (isMobile) {
      return {
        gridTemplate: '85px 1fr 85px',
        gap: '4px',
        padding: '8px 8px',
        navScale: 1,
        fontSize: '0.58rem'
      }
    }
    if (isTablet) {
      return {
        gridTemplate: '110px 1fr 110px',
        gap: '14px',
        padding: '10px 18px',
        navScale: 0.88,
        fontSize: '0.63rem'
      }
    }
    return {
      gridTemplate: '150px 1fr 150px',
      gap: '18px',
      padding: '12px 24px',
      navScale: 1,
      fontSize: '0.68rem'
    }
  }

  const gridConfig = getGridConfig()

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-40 flex justify-center px-3 sm:px-4 transition-all duration-500 ${headerPadding}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="w-full max-w-[1600px]">
        <nav
          className={`relative flex w-full items-center rounded-full border backdrop-blur-2xl uppercase transition-all duration-500 ${navBackgroundClass}`}
          style={{
            boxShadow: navShadow,
            display: 'grid',
            gridTemplateColumns: gridConfig.gridTemplate,
            gap: gridConfig.gap,
            padding: gridConfig.padding,
            alignItems: 'center',
            fontSize: gridConfig.fontSize,
            letterSpacing: '0.28em',
            overflow: 'visible'
          }}
        >
          {/* LEFT SECTION - Hamburger (Mobile) or Logo (Desktop) */}
          <div className="flex items-center justify-start">
            {isMobile ? (
              <button
                type="button"
                onClick={toggleMenu}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-xl transition-all duration-300 ${isUpsideDown
                  ? 'border-[#4cc9f0]/50 text-[#4cc9f0] hover:bg-[#0d1d36]/60 hover:border-[#4cc9f0]/70 hover:shadow-[0_0_16px_rgba(76,201,240,0.35)]'
                  : 'border-[#e50914]/50 text-[#ff5c6a] hover:bg-[#240305]/60 hover:border-[#e50914]/70 hover:shadow-[0_0_16px_rgba(229,9,20,0.35)]'
                  } ${menuOpen ? (isUpsideDown ? 'bg-[#0d2136]/50' : 'bg-[#290607]/50') : 'bg-transparent'}`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M3 6h18M3 12h18M3 18h18'}
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => scrollToId('home')}
                className={`font-display text-lg lg:text-xl tracking-[0.4em] lg:tracking-[0.45em] title-outline transition-colors duration-300 whitespace-nowrap text-stRed hover:text-stCream`}
              >
                SUMAN
              </button>
            )}
          </div>

          {/* CENTER SECTION - Brand (Mobile) or GooeyNav (Desktop/Tablet) */}
          <div className="flex items-center justify-center min-w-0" style={{ overflow: 'visible' }}>
            {isMobile ? (
              <button
                type="button"
                onClick={() => scrollToId('home')}
                className={`font-display text-base tracking-[0.38em] title-outline transition-colors duration-300 whitespace-nowrap text-stRed hover:text-stCream`}
              >
                SUMAN
              </button>
            ) : (
              <div className="w-full flex justify-center" style={{ overflow: 'visible', position: 'relative' }}>
                <GooeyNav
                  key={themeMode}
                  className="transition-all duration-300"
                  items={navItems}
                  animationTime={600}
                  particleCount={14}
                  particleDistances={[80, 10]}
                  particleR={95}
                  timeVariance={280}
                  accentColor={accentColor}
                  accentGlowColor={accentGlowColor}
                  inactiveTextColor={inactiveTextColor}
                  accentTextColor={accentTextColor}
                  focusRingColor={focusRingColor}
                  initialActiveIndex={0}
                  scale={gridConfig.navScale}
                />
              </div>
            )}
          </div>

          {/* RIGHT SECTION - Theme Toggle (Always) */}
          <div className="flex items-center justify-end">
            <ThemeToggle
              themeMode={themeMode}
              onToggle={onToggleTheme}
              variant="compact"
            />
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            className="fixed top-20 left-4 z-30 w-64 rounded-xl border backdrop-blur-2xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: isUpsideDown ? 'rgba(15, 32, 56, 0.95)' : 'rgba(43, 6, 9, 0.95)',
              borderColor: isUpsideDown ? 'rgba(76, 201, 240, 0.3)' : 'rgba(229, 9, 20, 0.3)',
              boxShadow: isUpsideDown
                ? '0 0 40px rgba(76, 201, 240, 0.2), 0 20px 60px rgba(0, 0, 0, 0.5)'
                : '0 0 40px rgba(229, 9, 20, 0.2), 0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-1 px-3 py-4 max-h-[70vh] overflow-y-auto">
              <p className={`text-[0.65rem] uppercase tracking-[0.2em] mb-2 px-2 font-semibold ${isUpsideDown ? 'text-[#4cc9f0]/70' : 'text-[#ff5c6a]/70'
                }`}>
                Navigation
              </p>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  type="button"
                  onClick={() => item.onSelect()}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ delay: index * 0.04, type: 'spring', stiffness: 400, damping: 30 }}
                  className={`w-full rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-left transition-all duration-200 ${isUpsideDown
                    ? 'border-[#4cc9f0]/20 text-[#d9f1ff] hover:bg-[#4cc9f0]/10 hover:border-[#4cc9f0]/50 hover:shadow-[0_0_15px_rgba(76,201,240,0.2)]'
                    : 'border-[#e50914]/20 text-[#ffd9d0] hover:bg-[#e50914]/10 hover:border-[#e50914]/50 hover:shadow-[0_0_15px_rgba(229,9,20,0.2)]'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

Navbar.propTypes = {
  themeMode: PropTypes.oneOf(['normal', 'upside-down']).isRequired,
  onToggleTheme: PropTypes.func.isRequired
}
