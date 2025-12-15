import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { fadeInGSAP } from '../animations/gsapUtils'
import { fadeInUp, staggerContainer } from '../animations/framerVariants'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      fadeInGSAP(sectionRef.current, 1.2)
    }
  }, [])

  return (
    <motion.section
      ref={sectionRef}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.section>
  )
}

export const AnimatedBox = ({ children, className = '' }: AnimatedSectionProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

