import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'
import './TechnologyStack.css'

const TechnologyStack = () => {
  return (
    <div className="technology-stack-page">
      <Navigation />
      <Logo />
      <motion.div
        className="technology-stack-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>TECHNOLOGY STACK</h1>
        <p>Coming soon...</p>
      </motion.div>
    </div>
  )
}

export default TechnologyStack

