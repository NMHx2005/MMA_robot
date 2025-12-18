import { motion } from 'framer-motion'
import Header from '../../components/common/Header/Header'
import './DataPlatform.css'
import ConcentricCircles from '../../components/Home/ConcentricCircles/ConcentricCircles'

const nodes = [
  { label: 'Upload', className: 'top', icon: '/upload.png' },
  { label: 'Annotate', className: 'left', icon: '/annotate.png' },
  { label: 'Train', className: 'right', icon: '/train.png' },
  { label: 'Deploy', className: 'bottom', icon: '/deploy.png' },
]

const DataPlatform = () => {
  return (
    <div className="data-platform-page">
      {/* Concentric Circles Background */}
      <ConcentricCircles />
      <Header showSocialIcons />

      <div className="dp-layout">
        <div className="dp-visual">
          <img
            src="/robot_data.png"
            alt="Robot Data"
            className="dp-robot-image"
          />
        </div>
        <div className="dp-panel">

          <div className="dp-panel-inner">
            {/* Decorative rectangles */}
            <div className="dp-decorative-rect dp-rect-top">
              <img src="/data.png" alt="Decorative Rect Top" />
            </div>
            <div className="dp-decorative-rect dp-rect-bottom">
              <img src="/data.png" alt="Decorative Rect Bottom" />
            </div>
            <div className='dp-panel-inner-content'>
              <div className="dp-title-wrap">
                <img src="/data_image_right.png" className='dp-image-right' alt="Decorative Rect Top" />
                <h1>DECENTRALIZED DATA PLATFORM</h1>
                <p className="dp-sub">
                  The <strong>combat-data</strong> layer for robotics.
                </p>
              </div>

              <div className='dp-graph-wrap'>
                {/* Mobile image - only visible on mobile */}
                <div className="dp-graph-mobile">
                  <img src="/bip.png" alt="Data Platform Mobile" className="dp-bip-image" />
                </div>
                {/* Desktop graph - hidden on mobile */}
                <div className="dp-graph">
                  <div className="dp-node center">
                    <div className="dp-node-card">
                      <svg width="201" height="239" viewBox="0 0 201 239" fill="none" xmlns="http://www.w3.org/2000/svg" className="dp-node-svg-outer">
                        {/* Outer hexagon for center node */}
                        <path className="dp-hex-outer" d="M200.302 59.3188L200.302 179.099C200.302 180.859 199.355 182.484 197.823 183.351L102.907 237.086C101.414 237.932 99.586 237.932 98.0928 237.086L3.17675 183.351C1.64504 182.484 0.698234 180.859 0.698234 179.099L0.69824 59.3188C0.6983 57.5588 1.64509 55.935 3.17676 55.0679L98.0928 1.33252C99.586 0.487149 101.414 0.487149 102.907 1.33252L197.823 55.0679C199.355 55.935 200.302 57.5588 200.302 59.3188Z" fill="white" stroke="#999999" strokeWidth="1.39583" />
                        {/* Glowing border between outer and inner hexagon */}
                        <path className="dp-hex-glow" d="M200.302 59.3188L200.302 179.099C200.302 180.859 199.355 182.484 197.823 183.351L102.907 237.086C101.414 237.932 99.586 237.932 98.0928 237.086L3.17675 183.351C1.64504 182.484 0.698234 180.859 0.698234 179.099L0.69824 59.3188C0.6983 57.5588 1.64509 55.935 3.17676 55.0679L98.0928 1.33252C99.586 0.487149 101.414 0.487149 102.907 1.33252L197.823 55.0679C199.355 55.935 200.302 57.5588 200.302 59.3188Z" fill="none" stroke="url(#glow-gradient-center)" strokeWidth="4" />
                        <defs>
                          <linearGradient id="glow-gradient-center" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                            <stop offset="15%" stopColor="rgba(255, 255, 255, 1)" />
                            <stop offset="30%" stopColor="rgba(255, 255, 255, 1)" />
                            <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                            <stop offset="70%" stopColor="rgba(255, 255, 255, 1)" />
                            <stop offset="85%" stopColor="rgba(255, 255, 255, 1)" />
                            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                            <animateTransform attributeName="gradientTransform" type="rotate" values="0 100.5 119.5;360 100.5 119.5" dur="7s" repeatCount="indefinite" />
                          </linearGradient>
                        </defs>
                        {/* Inner hexagon */}
                        <g transform="translate(12.5, 15.5)">
                          <path d="M173.083 52.0522L173.083 155.667C173.083 156.675 172.54 157.604 171.663 158.099L89.3096 204.568C88.4581 205.048 87.4169 205.048 86.5654 204.568L4.21191 158.099C3.33468 157.604 2.79199 156.675 2.79199 155.667L2.79199 52.0522C2.79199 51.045 3.33469 50.1156 4.21191 49.6206L86.5654 3.15185C87.4169 2.67139 88.4581 2.6714 89.3096 3.15185L171.663 49.6206C172.54 50.1156 173.083 51.045 173.083 52.0522Z" fill="white" stroke="#1D1D1D" strokeWidth="5.58333" />
                        </g>
                        {/* Icon image centered */}
                        <foreignObject x="0" y="0" width="201" height="239">
                          <div className="dp-node-icon-inner">
                            <img src="/memorychip.png" alt="Memory Chip" />
                          </div>
                        </foreignObject>
                      </svg>
                    </div>
                  </div>

                  {nodes.map((n, idx) => (
                    <motion.div
                      key={n.label}
                      className={`dp-node ${n.className}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05, duration: 0.4 }}
                    >
                      <div className="dp-node-card">
                        <svg width="144" height="171" viewBox="0 0 144 171" fill="none" xmlns="http://www.w3.org/2000/svg" className="dp-node-svg-outer">
                          {/* Outer hexagon (larger) */}
                          <path className="dp-hex-outer" d="M143.5 42.4971L143.5 128.31C143.5 129.57 142.822 130.734 141.725 131.355L73.7246 169.853C72.6548 170.458 71.3452 170.458 70.2754 169.853L2.27538 131.355C1.17816 130.734 0.499994 129.57 0.499994 128.31L0.499998 42.4971C0.499998 41.2361 1.17816 40.0724 2.27539 39.4512L70.2754 0.954098C71.3452 0.348462 72.6548 0.348462 73.7246 0.954098L141.725 39.4512C142.822 40.0725 143.5 41.2361 143.5 42.4971Z" fill="white" stroke="#999999" />
                          {/* Glowing border between outer and inner hexagon */}
                          <path className="dp-hex-glow" d="M143.5 42.4971L143.5 128.31C143.5 129.57 142.822 130.734 141.725 131.355L73.7246 169.853C72.6548 170.458 71.3452 170.458 70.2754 169.853L2.27538 131.355C1.17816 130.734 0.499994 129.57 0.499994 128.31L0.499998 42.4971C0.499998 41.2361 1.17816 40.0724 2.27539 39.4512L70.2754 0.954098C71.3452 0.348462 72.6548 0.348462 73.7246 0.954098L141.725 39.4512C142.822 40.0725 143.5 41.2361 143.5 42.4971Z" fill="none" stroke={`url(#glow-gradient-${n.label.toLowerCase()})`} strokeWidth="3.5" />
                          <defs>
                            <linearGradient id={`glow-gradient-${n.label.toLowerCase()}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                              <stop offset="15%" stopColor="rgba(255, 255, 255, 1)" />
                              <stop offset="30%" stopColor="rgba(255, 255, 255, 1)" />
                              <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                              <stop offset="70%" stopColor="rgba(255, 255, 255, 1)" />
                              <stop offset="85%" stopColor="rgba(255, 255, 255, 1)" />
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                              <animateTransform attributeName="gradientTransform" type="rotate" values="0 72 85.5;360 72 85.5" dur="7s" repeatCount="indefinite" />
                            </linearGradient>
                          </defs>
                          {/* Inner hexagon (smaller, centered) */}
                          <g transform="translate(9, 11)">
                            <path d="M124 37.291L124 111.523C124 112.245 123.611 112.911 122.982 113.266L63.9824 146.557C63.3727 146.9 62.6274 146.9 62.0176 146.557L3.01757 113.266C2.38912 112.911 2 112.245 2 111.523L2 37.291C2 36.5694 2.38913 35.9034 3.01758 35.5488L62.0176 2.25781C62.6273 1.91397 63.3726 1.91397 63.9824 2.25781L122.982 35.5488C123.611 35.9034 124 36.5694 124 37.291Z" fill="white" stroke="#1D1D1D" strokeWidth="4" />
                          </g>
                          {/* Icon image centered */}
                          <foreignObject x="0" y="0" width="144" height="171">
                            <div className="dp-node-icon-inner">
                              <img src={n.icon} alt={n.label} />
                              <span className="dp-node-label">{n.label}</span>
                            </div>
                          </foreignObject>
                        </svg>
                      </div>
                    </motion.div>
                  ))}

                  <div className="dp-lines">
                    {/* Upload → Annotate: vertical down */}
                    <div className="dp-line dp-line-upload-annotate">
                      <svg width="18" height="110" viewBox="0 0 18 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="9" y1="8.30516e-07" x2="9" y2="110" stroke="#0A0A0A" strokeWidth="2" />
                        <path d="M9 60.1563L1.20578 48.5547L16.7942 48.5547L9 60.1563Z" fill="#1D1D1D" />
                      </svg>
                    </div>
                    {/* Annotate → Central: diagonal up-right */}
                    <div className="dp-line dp-line-annotate-central">
                      <svg width="107" height="79" viewBox="0 0 107 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="4.95739" y1="71.0419" x2="84.4535" y2="19.1626" stroke="#0A0A0A" strokeWidth="2" />
                        <path d="M54.5061 38.5143L48.6311 51.7223L40.0517 38.7072L54.5061 38.5143Z" fill="#1D1D1D" />
                      </svg>
                    </div>
                    {/* Central → Train: diagonal down-right */}
                    <div className="dp-line dp-line-central-train">
                      <svg width="107" height="79" viewBox="0 0 107 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="-1" x2="94.9268" y2="-1" transform="matrix(-0.837446 -0.54652 -0.54652 0.837446 100.779 71.8794)" stroke="#0A0A0A" strokeWidth="2" />
                        <path d="M51.7771 38.5143L57.6521 51.7223L66.2315 38.7072L51.7771 38.5143Z" fill="#1D1D1D" />
                      </svg>
                    </div>
                    {/* Train → Deploy: vertical down */}
                    <div className="dp-line dp-line-train-deploy">
                      <svg width="18" height="113" viewBox="0 0 18 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="9" y1="113" x2="9" y2="-1.19249e-08" stroke="#0A0A0A" strokeWidth="2" />
                        <path d="M9 51.2031L16.7942 63.1211L1.20577 63.1211L9 51.2031Z" fill="#1D1D1D" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className='dp-cta-wrap'>
                <button className="cta-button magnetic">
                  <span>Join Early Access</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.28125 2.625L17.5014 10.8451C18.0872 11.4309 18.0872 12.3807 17.5014 12.9664L9.28125 21.1866" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default DataPlatform

