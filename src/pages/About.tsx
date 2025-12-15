import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Logo from '../components/Logo'
import './About.css'

const About = () => {
  return (
    <div className="about-page">
      <Navigation />
      <Logo />
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>ABOUT / WHAT WE DO</h1>
        <p>Coming soon...</p>
      </motion.div>
    </div>
  )
}

export default About

