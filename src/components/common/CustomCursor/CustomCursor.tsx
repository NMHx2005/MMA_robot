import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const magneticRef = useRef<HTMLElement | null>(null)
  const lastEventRef = useRef<MouseEvent | null>(null)
  const rafRef = useRef<number | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Tối ưu spring config - mượt nhưng không lag
  const springConfig = { damping: 18, stiffness: 420, mass: 0.12 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const processEvent = () => {
      const e = lastEventRef.current
      if (!e) return

      const target = e.target as HTMLElement
      const magneticElement = target.closest('.magnetic') as HTMLElement | null
      const interactiveEl =
        magneticElement ||
        (target.closest('button, a, .card, [class*=card], [class*=Card]') as HTMLElement | null)

      if (interactiveEl) {
        setIsHovering(true)
        magneticRef.current = magneticElement || interactiveEl

        const rect = magneticRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        const maxDistance = 80

        if (distance < maxDistance) {
          const force = Math.pow((maxDistance - distance) / maxDistance, 2) * 0.18
          const moveX = distanceX * force
          const moveY = distanceY * force
          cursorX.set(e.clientX - moveX)
          cursorY.set(e.clientY - moveY)
        } else {
          cursorX.set(e.clientX)
          cursorY.set(e.clientY)
        }
      } else {
        setIsHovering(false)
        magneticRef.current = null
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      lastEventRef.current = e
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(processEvent)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Ring - vòng tròn bên ngoài với blur/glow */}
      <motion.div
        className="cursor-ring"
        animate={{
          scale: isHovering ? 1.6 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 20,
          mass: 0.3,
        }}
      >
        {/* Dot - chấm nhỏ ở giữa ring */}
        <motion.div
          className="cursor-dot"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default CustomCursor


