import { motion } from 'framer-motion'
import Header from '../../components/common/Header/Header'
import './About.css'

const About = () => {
  const capabilities = [
    { label: 'Martial-arts reasoning' },
    { label: 'Fighting-style emulation' },
    { label: 'Autonomous engagement' },
  ]

  const trainingCards = [
    {
      id: 1,
      title: 'Legendary Fighting Styles',
      description:
        'Emulate phong cách của các võ sĩ nổi tiếng → robot chiến đấu để so sánh.',
      image: '/about-card-1.jpg',
      tone: 'dark',
    },
    {
      id: 2,
      title: 'Legendary Fighting Styles',
      description:
        'Emulate phong cách của các võ sĩ nổi tiếng → robot chiến đấu để so sánh.',
      image: '/about-card-2.jpg',
      tone: 'light',
    },
    {
      id: 3,
      title: 'Legendary Fighting Styles',
      description:
        'Emulate phong cách của các võ sĩ nổi tiếng → robot chiến đấu để so sánh.',
      image: '/about-card-3.jpg',
      tone: 'light',
    },
  ]

  return (
    <div className="about-page">
      <Header />
      <div className="about-background">
        <div className="about-overlay" />
      </div>

      <div className="about-content">
        <motion.section
          className="about-title-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="about-title">ABOUT / WHAT WE DO</h1>
          <p className="about-subtitle">
            StrikeRobot.AI huấn luyện robot theo 3 năng lực cốt lõi:
          </p>

          <div className="capabilities-tags">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.label}
                className="capability-tag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <div className="tag-corner top-left" />
                <div className="tag-corner bottom-right" />
                <span>{cap.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="training-engine-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="training-engine-title">TRAINING ENGINE</h2>

          <div className="training-cards">
            {trainingCards.map((card, index) => (
              <motion.article
                key={card.id}
                className={`training-card ${card.tone}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              >
                <div className="card-number">{card.id}</div>
                <div className="card-line" />
                <div className="card-shell">
                  <div className="card-image-wrapper">
                    <img src={card.image} alt={card.title} className="card-image" />
                  </div>
                  <div className="card-text-wrapper">
                    <div className="card-corner top-left" />
                    <div className="card-text">
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default About

