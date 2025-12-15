import { motion } from 'framer-motion'
import Header from '../../components/common/Header/Header'
import './TechnologyStack.css'

const TechnologyStack = () => {
  return (
    <div className="technology-stack-page">
      <Header />
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

