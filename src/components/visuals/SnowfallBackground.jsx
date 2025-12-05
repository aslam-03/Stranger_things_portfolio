import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Advanced snowfall background component with wind physics
 * Renders smooth, continuous snow animation with parallax effect
 * Supports theme-aware styling with gradient overlays
 */
export function SnowfallBackground({
  particleCount = 150,
  speed = 1,
  wind = 1,
  backgroundColor = 'transparent',
  particleColor = 'rgba(255, 255, 255, 0.8)',
  glowColor = 'rgba(229, 9, 20, 0.15)',
}) {
  const canvasRef = useRef(null)
  const requestRef = useRef()
  const particles = useRef([])
  const glowCanvasRef = useRef(null)
  const [portalContainer, setPortalContainer] = useState(null)

  useEffect(() => {
    const node = document.createElement('div')
    node.className = 'snowfall-layer'
    node.style.position = 'fixed'
    node.style.inset = '0'
    node.style.zIndex = '0'
    node.style.pointerEvents = 'none'
    node.style.mixBlendMode = 'normal'
    document.body.appendChild(node)
    setPortalContainer(node)

    return () => {
      document.body.removeChild(node)
    }
  }, [])

  useEffect(() => {
    if (!portalContainer) return
    const canvas = canvasRef.current
    const glowCanvas = glowCanvasRef.current
    if (!canvas || !glowCanvas) return

    const ctx = canvas.getContext('2d')
    const glowCtx = glowCanvas.getContext('2d')
    if (!ctx || !glowCtx) return

    // Set canvas size to match window
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      glowCanvas.width = window.innerWidth
      glowCanvas.height = window.innerHeight
    }

    // Initial resize
    handleResize()
    window.addEventListener('resize', handleResize)

    // Initialize particles
    const initParticles = () => {
      particles.current = []
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(createSnowflake(canvas.width, canvas.height))
      }
    }

    const createSnowflake = (width, height, resetY = false) => {
      return {
        x: Math.random() * width,
        y: resetY ? -10 : Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: (Math.random() * 1 + 0.5) * speed,
        wind: (Math.random() - 0.5) * 0.5 * wind,
        windAngle: Math.random() * Math.PI * 2,
        windSpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8 opacity
      }
    }

    initParticles()

    // Time-based animation for consistent speed regardless of scroll
    let lastFrameTime = performance.now()
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    // Animation loop
    const animate = (currentTime) => {
      if (!canvas || !ctx || !glowCanvas || !glowCtx) return

      // Calculate delta time for frame-rate independent animation
      const deltaTime = Math.min(currentTime - lastFrameTime, 50) / 1000
      lastFrameTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      glowCtx.clearRect(0, 0, glowCanvas.width, glowCanvas.height)

      // Draw background if specified
      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particles.current.forEach((flake, index) => {
        // Update position with consistent delta time (always falls smoothly)
        flake.y += flake.speed * (flake.radius / 2) * 60 * deltaTime
        flake.windAngle += flake.windSpeed
        flake.x += Math.cos(flake.windAngle) * wind + flake.wind

        // Draw snowflake on main canvas
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()

        // Draw glow effect on separate canvas
        glowCtx.beginPath()
        glowCtx.arc(flake.x, flake.y, flake.radius * 2, 0, Math.PI * 2)
        glowCtx.fillStyle = glowColor
        glowCtx.fill()

        // Reset if out of bounds
        if (flake.y > canvas.height) {
          particles.current[index] = createSnowflake(
            canvas.width,
            canvas.height,
            true,
          )
        }

        // Wrap around sides
        if (flake.x > canvas.width + 5) {
          flake.x = -5
        } else if (flake.x < -5) {
          flake.x = canvas.width + 5
        }
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      window.removeEventListener('resize', handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [particleCount, speed, wind, backgroundColor, particleColor, glowColor, portalContainer])

  if (!portalContainer) {
    return null
  }

  return createPortal(
    <>
      <canvas
        ref={glowCanvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          width: '100vw',
          height: '100vh',
          opacity: 0.5,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          width: '100vw',
          height: '100vh',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      />
    </>,
    portalContainer
  )
}

export default SnowfallBackground
