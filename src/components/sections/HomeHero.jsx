import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import NeonButton from '../ui/NeonButton'
import { heroContent } from '../../data/content'
import { scrollToId } from '../../utils/scroll'

/**
 * Lightning effect using WebGL shaders
 * Customizable hue, speed, intensity, and size
 */
function LightningEffect({ hue = 230, speed = 1.6, intensity = 0.6, size = 2 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          
          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;
          
          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `

    const compileShader = (source, type) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution')
    const iTimeLocation = gl.getUniformLocation(program, 'iTime')
    const uHueLocation = gl.getUniformLocation(program, 'uHue')
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed')
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity')
    const uSizeLocation = gl.getUniformLocation(program, 'uSize')

    const startTime = performance.now()
    const render = () => {
      resizeCanvas()
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height)
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0)
      gl.uniform1f(uHueLocation, hue)
      gl.uniform1f(uSpeedLocation, speed)
      gl.uniform1f(uIntensityLocation, intensity)
      gl.uniform1f(uSizeLocation, size)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [hue, speed, intensity, size])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.4 }}
    />
  )
}

export default function HomeHero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [enableParallax, setEnableParallax] = useState(false)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 12 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 12 })
  const moveX = useTransform(springX, [-200, 200], [-15, 15])
  const moveY = useTransform(springY, [-200, 200], [-15, 15])

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const evaluate = () => {
      setEnableParallax(pointerQuery.matches && !motionQuery.matches)
    }

    evaluate()
    pointerQuery.addEventListener('change', evaluate)
    motionQuery.addEventListener('change', evaluate)

    return () => {
      pointerQuery.removeEventListener('change', evaluate)
      motionQuery.removeEventListener('change', evaluate)
    }
  }, [])

  useEffect(() => {
    if (!enableParallax) {
      mouseX.set(0)
      mouseY.set(0)
      return undefined
    }

    const handleMove = (event) => {
      mouseX.set(event.clientX - window.innerWidth / 2)
      mouseY.set(event.clientY - window.innerHeight / 2)
    }
    let rafId
    const throttled = (event) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => handleMove(event))
    }
    window.addEventListener('pointermove', throttled, { passive: true })
    return () => {
      window.removeEventListener('pointermove', throttled)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [enableParallax, mouseX, mouseY])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-visible">
      {/* Lightning effect background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <LightningEffect hue={360} speed={1.6} intensity={0.5} size={2} />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Radial gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-b from-stRed/20 to-transparent blur-3xl" />
      </div>

      {/* Parallax overlay */}
      <motion.div
        style={enableParallax ? { x: moveX, y: moveY } : undefined}
        className="absolute inset-0 -z-10 opacity-20"
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(229,9,20,0.15),_transparent_55%)]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:text-left">
        <motion.p
          className="text-sm uppercase tracking-[0.6em] text-stBlue"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          Welcome to the Upside Down
        </motion.p>

        <motion.h1
          className="mt-6 text-4xl sm:text-5xl md:text-6xl title-outline flicker glitch"
          data-text={heroContent.name.toUpperCase()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
        >
          {heroContent.name}
        </motion.h1>

        <motion.p
          className="mt-5 text-lg text-stCream/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.6, duration: 1.1 }}
        >
          {heroContent.role} · {heroContent.highlights.join(' · ')}
        </motion.p>

        <motion.p
          className="mt-4 max-w-2xl text-base text-stCream/70"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
        >
          {heroContent.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 text-xs uppercase tracking-[0.4em] md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <NeonButton onClick={() => scrollToId('projects')}>View Projects</NeonButton>
          <NeonButton variant="ghost" onClick={() => scrollToId('contact')}>
            Contact Me
          </NeonButton>
        </motion.div>
      </div>
    </section>
  )
}
