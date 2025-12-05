import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

const STYLE_BLOCK = `
  .gn-effect {
    position: absolute;
    opacity: 1;
    pointer-events: none;
    display: grid;
    place-items: center;
    z-index: 1;
  }

  .gn-effect--filter {
    border-radius: 999px;
    background: var(--active-bg, #e50914);
    opacity: 0;
    transform: scale(0.5);
    transition: transform 0.32s ease, opacity 0.32s ease;
    box-shadow: 0 0 32px var(--active-glow, rgba(229, 9, 20, 0.45));
  }

  .gn-effect--filter.gn-effect--active {
    opacity: 0.88;
    transform: scale(1);
    box-shadow: 0 0 32px var(--active-glow, rgba(229, 9, 20, 0.45));
  }

  .gn-effect--text {
    color: transparent;
    pointer-events: none;
  }

  @keyframes gn-particle-motion {
    0% {
      transform: rotate(0deg) translate(var(--start-x), var(--start-y));
      opacity: 1;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    70% {
      transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
      opacity: 1;
      animation-timing-function: ease;
    }
    85% {
      transform: rotate(calc(var(--rotate) * 0.66)) translate(var(--end-x), var(--end-y));
      opacity: 1;
    }
    100% {
      transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
      opacity: 1;
    }
  }

  @keyframes gn-particle-point {
    0% {
      transform: scale(0);
      opacity: 0;
      animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
    }
    25% {
      transform: scale(calc(var(--scale) * 0.25));
    }
    38% {
      opacity: 1;
    }
    65% {
      transform: scale(var(--scale));
      opacity: 1;
      animation-timing-function: ease;
    }
    85% {
      transform: scale(var(--scale));
      opacity: 1;
    }
    100% {
      transform: scale(0);
      opacity: 0;
    }
  }

  .gn-particle,
  .gn-particle__point {
    display: block;
    opacity: 0;
    width: 20px;
    height: 20px;
    border-radius: 999px;
    transform-origin: center;
  }

  .gn-particle {
    --time: 5s;
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 10px);
    animation: gn-particle-motion calc(var(--time)) ease 1 -350ms forwards;
  }

  .gn-particle__point {
    background: var(--color, #ffffff);
    opacity: 1;
    animation: gn-particle-point calc(var(--time)) ease 1 -350ms forwards;
  }

  .gn-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: clamp(1.25rem, 2.2vw, 1.75rem);
    position: relative;
    z-index: 3;
    flex-wrap: nowrap;
    width: 100%;
    justify-content: center;
  }

  .gn-item {
    position: relative;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--inactive-text, rgba(255, 255, 255, 0.88));
  }

  .gn-item::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: var(--active-bg, #e50914);
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: -1;
  }

  .gn-item--active::after,
  .gn-item:hover::after,
  .gn-item:focus-within::after {
    opacity: 0.9;
    transform: scale(1);
  }

  .gn-item--active,
  .gn-item:hover,
  .gn-item:focus-within {
    color: var(--accent-text, rgba(255, 255, 255, 0.96));
  }

  .gn-button {
    background: none;
    padding: 0.6em 1.1em;
    text-transform: uppercase;
    letter-spacing: 0.35em;
    font-size: clamp(0.65rem, 1.8vw, 0.72rem);
    font-weight: 600;
    color: inherit;
    transition: color 0.3s ease;
    white-space: nowrap;
  }

  .gn-button:focus-visible {
    outline: 2px solid var(--focus-ring, rgba(255, 255, 255, 0.55));
    outline-offset: 4px;
  }

  @media (max-width: 1280px) {
    .gn-button {
      padding: 0.55em 0.95em;
      letter-spacing: 0.3em;
    }
    .gn-list {
      gap: 1.5rem;
    }
  }

  @media (max-width: 1100px) {
    .gn-button {
      padding: 0.5em 0.85em;
      font-size: 0.65rem;
      letter-spacing: 0.28em;
    }
    .gn-list {
      gap: 1.25rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .gn-effect--filter,
    .gn-particle,
    .gn-particle__point {
      animation-duration: 0ms !important;
      transition: none !important;
    }
  }
`

const defaultColorStops = ['#ff3b5c', '#e50914', '#ff6f61', '#ffd166']
const defaultColorIndices = [1, 2, 3, 2, 4, 3, 1, 2]

const clampIndex = (value, max) => {
  if (max <= 0) return 0
  return Math.min(Math.max(value, 0), max - 1)
}

export default function GooeyNav({
  items,
  className = '',
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  accentColor = '#e50914',
  accentGlowColor = 'rgba(229, 9, 20, 0.55)',
  inactiveTextColor = 'rgba(243, 228, 207, 0.78)',
  accentTextColor = 'rgba(255, 255, 255, 0.96)',
  focusRingColor = 'rgba(255, 255, 255, 0.55)',
  initialActiveIndex = 0,
  scale = 1
}) {
  const containerRef = useRef(null)
  const navRef = useRef(null)
  const filterRef = useRef(null)
  const timeoutsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(() => clampIndex(initialActiveIndex, items.length))

  const registerTimeout = (fn, delay) => {
    const id = window.setTimeout(() => {
      fn()
      timeoutsRef.current = timeoutsRef.current.filter((storedId) => storedId !== id)
    }, delay)
    timeoutsRef.current.push(id)
    return id
  }

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
      timeoutsRef.current = []
      clearParticles()
    }
  }, [])

  useEffect(() => {
    setActiveIndex((prev) => clampIndex(prev, items.length))
  }, [items.length])

  useEffect(() => {
    setActiveIndex(clampIndex(initialActiveIndex, items.length))
  }, [initialActiveIndex, items.length])

  const styleVars = {
    '--active-bg': accentColor,
    '--active-glow': accentGlowColor,
    '--inactive-text': inactiveTextColor,
    '--accent-text': accentTextColor,
    '--focus-ring': focusRingColor
  }

  const noise = (n = 1) => n / 2 - Math.random() * n

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
  }

  const createParticle = (i, t, distances, radius) => {
    const rotate = noise(radius / 10)
    return {
      start: getXY(distances[0], particleCount - i, particleCount),
      end: getXY(distances[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      rotate: rotate > 0 ? (rotate + radius / 20) * 10 : (rotate - radius / 20) * 10
    }
  }

  const clearParticles = () => {
    if (!filterRef.current) return
    filterRef.current.querySelectorAll('.gn-particle').forEach((node) => {
      node.remove()
    })
  }

  const makeParticles = (element) => {
    if (!element) return
    const distances = particleDistances
    const radius = particleR
    const bubbleTime = animationTime * 2 + timeVariance
    element.style.setProperty('--time', `${bubbleTime}ms`)
    element.classList.remove('gn-effect--active')

    for (let i = 0; i < particleCount; i += 1) {
      const t = animationTime * 2 + noise(timeVariance * 2)
      const particleConfig = createParticle(i, t, distances, radius)

      registerTimeout(() => {
        if (!element) return
        const particle = document.createElement('span')
        const point = document.createElement('span')
        particle.classList.add('gn-particle')
        particle.style.setProperty('--start-x', `${particleConfig.start[0]}px`)
        particle.style.setProperty('--start-y', `${particleConfig.start[1]}px`)
        particle.style.setProperty('--end-x', `${particleConfig.end[0]}px`)
        particle.style.setProperty('--end-y', `${particleConfig.end[1]}px`)
        particle.style.setProperty('--time', `${particleConfig.time}ms`)
        particle.style.setProperty('--scale', `${particleConfig.scale}`)
        particle.style.setProperty('--color', accentColor)
        particle.style.setProperty('--rotate', `${particleConfig.rotate}deg`)
        point.classList.add('gn-particle__point')
        particle.appendChild(point)
        element.appendChild(particle)

        requestAnimationFrame(() => {
          element.classList.add('gn-effect--active')
        })

        registerTimeout(() => {
          particle.remove()
        }, t)
      }, 30 + i * 12)
    }

    registerTimeout(() => {
      element.classList.remove('gn-effect--active')
    }, bubbleTime + 120)
  }

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !element) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const { x, y, width, height } = element.getBoundingClientRect()

    // Account for scale transform - divide by scale to get true unscaled positions
    const scaleFactor = scale || 1
    const relativeX = (x - containerRect.x) / scaleFactor
    const relativeY = (y - containerRect.y) / scaleFactor
    const scaledWidth = width / scaleFactor
    const scaledHeight = height / scaleFactor

    const styles = {
      left: `${relativeX}px`,
      top: `${relativeY}px`,
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`
    }

    Object.assign(filterRef.current.style, styles)
  }

  const activateItem = (liElement, index, item) => {
    if (!liElement) return
    setActiveIndex(index)
    updateEffectPosition(liElement)
    clearParticles()

    if (filterRef.current) {
      makeParticles(filterRef.current)
    }

    if (typeof item.onSelect === 'function') {
      item.onSelect()
    }
  }

  const handleClick = (event, index, item) => {
    event.preventDefault()
    const liElement = event.currentTarget.closest('li')
    if (!liElement) return
    activateItem(liElement, index, item)
  }

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return
    const listItems = navRef.current.querySelectorAll('li')
    const activeLi = listItems[activeIndex]
    if (activeLi) {
      updateEffectPosition(activeLi)
    }

    let resizeObserver
    if (typeof ResizeObserver === 'function') {
      resizeObserver = new ResizeObserver(() => {
        const currentLi = navRef.current?.querySelectorAll('li')[activeIndex]
        if (currentLi) {
          updateEffectPosition(currentLi)
        }
      })
      resizeObserver.observe(containerRef.current)
    } else {
      const resizeHandler = () => {
        const currentLi = navRef.current?.querySelectorAll('li')[activeIndex]
        if (currentLi) {
          updateEffectPosition(currentLi)
        }
      }
      window.addEventListener('resize', resizeHandler)
      return () => window.removeEventListener('resize', resizeHandler)
    }

    return () => {
      resizeObserver?.disconnect()
    }
  }, [activeIndex, items.length])

  if (!items.length) {
    return null
  }

  return (
    <div 
      className={`relative ${className}`} 
      ref={containerRef} 
      style={{
        ...styleVars,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        transition: 'transform 0.3s ease'
      }}
    >
      <style>{STYLE_BLOCK}</style>
      <nav className="relative" style={{ transform: 'translate3d(0, 0, 0.01px)' }}>
        <ul
          ref={navRef}
          className="gn-list"
          style={{ letterSpacing: '0.35em', textTransform: 'uppercase' }}
        >
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              className={`gn-item ${activeIndex === index ? 'gn-item--active' : ''}`}
            >
              <button
                type="button"
                onClick={(event) => handleClick(event, index, item)}
                className="gn-button"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <span className="gn-effect gn-effect--filter" ref={filterRef} />
    </div>
  )
}

GooeyNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onSelect: PropTypes.func
    })
  ).isRequired,
  className: PropTypes.string,
  animationTime: PropTypes.number,
  particleCount: PropTypes.number,
  particleDistances: PropTypes.arrayOf(PropTypes.number),
  particleR: PropTypes.number,
  timeVariance: PropTypes.number,
  accentColor: PropTypes.string,
  accentGlowColor: PropTypes.string,
  inactiveTextColor: PropTypes.string,
  accentTextColor: PropTypes.string,
  focusRingColor: PropTypes.string,
  initialActiveIndex: PropTypes.number,
  scale: PropTypes.number
}
