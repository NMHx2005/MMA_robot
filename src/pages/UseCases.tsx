import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'
import './UseCases.css'

const UseCases = () => {
  return (
    <div className="use-cases-page">
      <Navigation />
      <Logo />
      <motion.div
        className="use-cases-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>USE CASES</h1>
        <p>Coming soon...</p>
      </motion.div>
    </div>
  )
}

export default UseCases

