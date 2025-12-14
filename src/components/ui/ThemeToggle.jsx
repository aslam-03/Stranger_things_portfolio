import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ThemeToggle({ themeMode, onToggle, variant = 'standard', className = '' }) {
  const isUpsideDown = themeMode === 'upside-down'

  // Red text for normal (Hawkins), Blue text for upside-down
  const activeColor = isUpsideDown ? '#4cc9f0' : '#e50914'
  const activeGlow = isUpsideDown
    ? '0 0 15px rgba(76,201,240,0.5)'
    : '0 0 15px rgba(229,9,20,0.5)'

  if (variant === 'compact') {
    return (
      <div
        className={`relative flex h-8 w-20 md:w-24 cursor-pointer items-center rounded-full border border-white/10 bg-black/40 shadow-inner backdrop-blur-md ${className}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
      >
        {/* Labels Background - positioned absolutely to stay behind */}
        <div className="absolute inset-0 flex w-full items-center justify-between px-2 text-[0.55rem] font-bold uppercase tracking-wider">
          <span className={`transition-opacity duration-300 ml-1 ${!isUpsideDown ? 'opacity-0' : 'opacity-60 text-white'}`}>
            Red
          </span>
          <span className={`transition-opacity duration-300 mr-0.5 ${isUpsideDown ? 'opacity-0' : 'opacity-60 text-white'}`}>
            Blue
          </span>
        </div>

        {/* Sliding Thumb Container - uses padding/flex for positioning */}
        <div className={`flex h-full w-full items-center px-1 ${isUpsideDown ? 'justify-end' : 'justify-start'}`}>
          <motion.div
            layout
            className="flex h-6 w-10 md:w-12 items-center justify-center rounded-full shadow-lg"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              backgroundColor: isUpsideDown ? 'rgba(76, 201, 240, 0.2)' : 'rgba(229, 9, 20, 0.2)',
              borderColor: isUpsideDown ? 'rgba(76,201,240,0.5)' : 'rgba(229,9,20,0.5)',
              borderWidth: '1px',
              boxShadow: activeGlow
            }}
          >
            <span className={`text-[0.5rem] md:text-[0.6rem] font-bold tracking-widest ${isUpsideDown ? 'text-[#4cc9f0]' : 'text-[#ff5c6a]'}`}>
              {isUpsideDown ? 'BLUE' : 'RED'}
            </span>
          </motion.div>
        </div>
      </div>
    )
  }

  // Fallback for other variants if they exist (preserving 'circle' logic roughly or redirecting to standard behavior)
  return (
    <button
      onClick={onToggle}
      className={`rounded-full border border-white/10 px-4 py-2 text-xs uppercase text-white backdrop-blur-md transition hover:bg-white/5 ${className}`}
    >
      {isUpsideDown ? 'Switch to Red' : 'Switch to Blue'}
    </button>
  )
}

ThemeToggle.propTypes = {
  themeMode: PropTypes.oneOf(['normal', 'upside-down']).isRequired,
  onToggle: PropTypes.func.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string
}
