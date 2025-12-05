import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomeHero from './components/sections/HomeHero'
import AboutSection from './components/sections/AboutSection'
import ExperienceSection from './components/sections/ExperienceSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import CertificationsSection from './components/sections/CertificationsSection'
import ContactSection from './components/sections/ContactSection'
import SnowfallBackground from './components/visuals/SnowfallBackground'
import PortalLoader from './components/PortalLoader'

export default function App() {
  const [themeMode, setThemeMode] = useState('normal')
  const [showLoader, setShowLoader] = useState(true)

  const sections = useMemo(
    () => [
      <HomeHero key="home" themeMode={themeMode} />,
      <AboutSection key="about" />,
      <ExperienceSection key="experience" />,
      <SkillsSection key="skills" />,
      <ProjectsSection key="projects" />,
      <CertificationsSection key="certifications" />,
      <ContactSection key="contact" />
    ],
    [themeMode]
  )

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
  }, [themeMode])

  useEffect(() => {
    document.body.style.overflow = showLoader ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showLoader])

  const toggleTheme = () =>
    setThemeMode((prev) => (prev === 'normal' ? 'upside-down' : 'normal'))

  const isUpsideDown = themeMode === 'upside-down'
  const snowfallLayerZIndex = 24

  // Theme-specific snowfall colors
  const snowfallConfig = isUpsideDown
    ? {
        particleCount: 150,
        speed: 1,
        wind: 0.8,
        glowColor: 'rgba(76, 201, 240, 0.2)',
      }
    : {
        particleCount: 150,
        speed: 1,
        wind: 1,
        glowColor: 'rgba(229, 9, 20, 0.15)',
      }

  return (
    <>
      <Navbar themeMode={themeMode} onToggleTheme={toggleTheme} />
      <div className={`app-shell ${isUpsideDown ? 'theme-upside' : ''}`}>
        <AnimatePresence>
          {showLoader && (
            <PortalLoader key="portal-loader" onFinish={() => setShowLoader(false)} />
          )}
        </AnimatePresence>
        <div className={`app-stage ${isUpsideDown ? 'upside-tone-filter' : ''}`}>
          <SnowfallBackground
            key={themeMode}
            {...snowfallConfig}
            layerZIndex={snowfallLayerZIndex}
          />
          <div className="grain-overlay" />
          <div className="glitch-overlay" />
          <div className="vignette-overlay" />
          <main className="relative z-10 mx-auto max-w-6xl px-6 pt-0 pb-24">
            {sections}
            <Footer />
          </main>
        </div>
      </div>
    </>
  )
}
