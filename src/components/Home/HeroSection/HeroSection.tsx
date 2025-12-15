import { motion } from 'framer-motion'
import TextScramble from '../../common/TextScramble/TextScramble'
import './HeroSection.css'

const HeroSection = () => {
  const titleLines = [
    'THE COMBAT',
    'INTELLIGENCE',
    'TRAINING NETWORK',
    'FOR ROBOTS.',
  ]

  return (
    <motion.div
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-title">
        {titleLines.map((line, index) => (
          <motion.h1
            key={index}
            className="hero-line"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
          >
            <TextScramble text={line} speed={30} />
          </motion.h1>
        ))}
      </div>
    </motion.div>
  )
}

export default HeroSection
