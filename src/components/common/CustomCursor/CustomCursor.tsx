import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const magneticRef = useRef<HTMLElement | null>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Tối ưu spring config - tăng stiffness, giảm damping để responsive hơn, ít lag
  const springConfig = { damping: 20, stiffness: 500, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const magneticElement = target.closest('.magnetic') as HTMLElement

      // Check if hovering over interactive elements (buttons, links, cards)
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        magneticElement ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.card') ||
        target.closest('[class*="card"]') ||
        target.closest('[class*="Card"]')

      if (isInteractive) {
        setIsHovering(true)

        const element = magneticElement ||
          (target.closest('button') as HTMLElement) ||
          (target.closest('a') as HTMLElement) ||
          (target.closest('.card') as HTMLElement) ||
          (target.closest('[class*="card"]') as HTMLElement) ||
          (target.closest('[class*="Card"]') as HTMLElement)

        if (element) {
          magneticRef.current = element

          // Calculate magnetic effect - cursor hút nhẹ vào element, không quá mạnh
          const rect = element.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const distanceX = e.clientX - centerX
          const distanceY = e.clientY - centerY
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
          const maxDistance = 80 // Giảm khoảng cách từ 120 xuống 80

          if (distance < maxDistance) {
            // Giảm force để cursor không bị kéo quá mạnh
            const force = Math.pow((maxDistance - distance) / maxDistance, 2) * 0.2 // Giảm từ 0.5 xuống 0.2
            const moveX = distanceX * force
            const moveY = distanceY * force
            // Giữ cursor gần vị trí chuột thực tế hơn, chỉ hút nhẹ
            cursorX.set(e.clientX - moveX)
            cursorY.set(e.clientY - moveY)
          } else {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
          }
        } else {
          magneticRef.current = null
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
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


