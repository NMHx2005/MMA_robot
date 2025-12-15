import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'
import './Partners.css'

const Partners = () => {
  return (
    <div className="partners-page">
      <Navigation />
      <Logo />
      <motion.div
        className="partners-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>OUR PARTNERS</h1>
        <p>Coming soon...</p>
      </motion.div>
    </div>
  )
}

export default Partners

