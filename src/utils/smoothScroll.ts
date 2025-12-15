// Smooth Scroll with Lenis
export const initLenisSmoothScroll = async () => {
  try {
    const Lenis = (await import('lenis')).default
    
    const lenis = new Lenis({
      duration: 1.5, // Slower, more premium feel
      easing: (t: number) => {
        // Custom easing for heavy, premium feel
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slower scroll speed
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Update scroll position on route change
    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: true })
    }

    window.addEventListener('popstate', handleRouteChange)

    return lenis
  } catch (error) {
    console.warn('Lenis not available, using native smooth scroll')
    initSmoothScroll()
    return null
  }
}

// Fallback smooth scroll
export const initSmoothScroll = () => {
  document.documentElement.style.scrollBehavior = 'smooth'
  
  // Add momentum scrolling for touch devices
  if ('ontouchstart' in window) {
    let touchStartY = 0
    let touchStartTime = 0
    let touchVelocity = 0

    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    })

    document.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY
      const touchTime = Date.now()
      const deltaY = touchY - touchStartY
      const deltaTime = touchTime - touchStartTime

      if (deltaTime > 0) {
        touchVelocity = deltaY / deltaTime
      }
    })

    document.addEventListener('touchend', () => {
      if (Math.abs(touchVelocity) > 0.5) {
        const momentum = touchVelocity * 300
        window.scrollBy({
          top: -momentum,
          behavior: 'smooth',
        })
      }
      touchVelocity = 0
    })
  }
}
