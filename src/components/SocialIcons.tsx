import { motion } from 'framer-motion'
import './SocialIcons.css'

const SocialIcons = () => {
  return (
    <motion.div
      className="social-icons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <motion.a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon magnetic"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/Social Icons.png" alt="Github Icon" />
      </motion.a>
      <motion.a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon magnetic"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/book-icon.png" alt="Github Icon" />
      </motion.a>
    </motion.div>
  )
}

export default SocialIcons

