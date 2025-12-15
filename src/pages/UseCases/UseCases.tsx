import { motion } from 'framer-motion'
import Header from '../../components/common/Header/Header'
import './UseCases.css'

const UseCases = () => {
  return (
    <div className="use-cases-page">
      <Header />
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

