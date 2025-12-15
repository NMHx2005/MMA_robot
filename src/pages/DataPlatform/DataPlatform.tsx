import { motion } from 'framer-motion'
import Header from '../../components/common/Header/Header'
import './DataPlatform.css'

const DataPlatform = () => {
  return (
    <div className="data-platform-page">
      <Header />
      <motion.div
        className="data-platform-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>DECENTRALIZED DATA PLATFORM</h1>
        <p>Coming soon...</p>
      </motion.div>
    </div>
  )
}

export default DataPlatform

