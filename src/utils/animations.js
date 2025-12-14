export const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.9,
      ease: [0.45, 0, 0.55, 1]
    }
  })
}

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

export const floatVariant = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.8,
      ease: 'easeInOut'
    }
  }
}

export const hoverGlow = {
  rest: { scale: 1, filter: 'drop-shadow(0 0 0 rgba(var(--theme-r),var(--theme-g),var(--theme-b),0))' },
  hover: {
    scale: 1.02,
    filter: 'drop-shadow(0 0 18px rgba(var(--theme-r),var(--theme-g),var(--theme-b),0.6))',
    transition: { duration: 0.35, ease: 'easeInOut' }
  }
}
