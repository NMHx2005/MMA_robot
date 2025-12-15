import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'
import HeroSection from '../components/HeroSection'
import VideoCard from '../components/VideoCard'
import SocialIcons from '../components/SocialIcons'
import StrikeText from '../components/StrikeText'
import RobotText from '../components/RobotText'
import ConcentricCircles from '../components/ConcentricCircles'
import './Home.css'

const Home = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!robotRef.current) return

    // Initial animation with GSAP - smoother
    gsap.fromTo(
      robotRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.3,
        force3D: true,
        onComplete: () => {
          // Start breathing animation after initial animation
          startBreathing()
        }
      }
    )

    // Robot parallax on mouse move
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let breathingY = 0
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      mouseX = (clientX / innerWidth - 0.5) * 30
      mouseY = (clientY / innerHeight - 0.5) * 30
    }

    // Breathing animation
    let breathingTime = 0
    const startBreathing = () => {
      const updateBreathing = () => {
        breathingTime += 0.016 // ~60fps
        breathingY = Math.sin(breathingTime * (Math.PI / 3)) * 8 // 3 seconds cycle, 8px amplitude
      }
      updateBreathing()
    }

    // Smooth parallax update with breathing combined
    const updateParallax = () => {
      if (robotRef.current) {
        // Smoother interpolation
        currentX += (mouseX - currentX) * 0.15
        currentY += (mouseY - currentY) * 0.15

        // Update breathing
        breathingTime += 0.016
        breathingY = Math.sin(breathingTime * (Math.PI / 3)) * 8

        // Combine parallax and breathing - maintain center position with xPercent
        gsap.set(robotRef.current, {
          xPercent: -50, // Keep centered horizontally
          x: -currentX, // Add parallax offset
          y: -currentY + breathingY,
          force3D: true,
        })

        rafId = requestAnimationFrame(updateParallax)
      }
    }

    // Start parallax after initial animation
    setTimeout(() => {
      updateParallax()
    }, 1500)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <div className="home-page">
      {/* Concentric Circles Background */}
      <ConcentricCircles />

      {/* Background with STRIKE and ROBOT text */}
      <motion.div
        ref={backgroundRef}
        className="home-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <StrikeText />
        <RobotText />
      </motion.div>

      {/* Header */}
      <header className="page-header">
        {/* Social Icons - Left */}
        <motion.div
          className="social-icons-top"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SocialIcons />
        </motion.div>

        {/* Logo - Center */}
        <Logo />

        {/* Navigation - Right */}
        <Navigation />
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Robot Image with Parallax */}
      <div ref={robotRef} className="robot-container">
        <div className="robot-image">
          <img src="/robot.png" alt="Robot" />
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        className="cta-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="cta-description">
          Train robots to fight, protect, and reason through martial arts — from
          simulation to real-world autonomy.
        </p>
        <motion.button
          className="cta-button magnetic"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Join Early Access</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.28125 2.625L17.5014 10.8451C18.0872 11.4309 18.0872 12.3807 17.5014 12.9664L9.28125 21.1866" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Video Card */}
      <VideoCard />
    </div>
  )
}

export default Home
