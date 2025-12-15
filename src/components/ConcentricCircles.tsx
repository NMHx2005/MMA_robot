import { motion } from 'framer-motion'
import './ConcentricCircles.css'

const ConcentricCircles = () => {
    // Vòng tròn đồng tâm bên trái
    const leftCircles = [
        { r: 200, opacity: 0.1, cx: 300, cy: 800 },
        { r: 350, opacity: 0.08, cx: 300, cy: 800 },
        { r: 500, opacity: 0.06, cx: 300, cy: 800 },
        { r: 650, opacity: 0.04, cx: 300, cy: 800 },
    ]

    // Vòng tròn đồng tâm bên phải
    const rightCircles = [
        { r: 180, opacity: 0.1, cx: 1600, cy: 400 },
        { r: 330, opacity: 0.08, cx: 1600, cy: 400 },
        { r: 480, opacity: 0.06, cx: 1600, cy: 400 },
        { r: 630, opacity: 0.04, cx: 1600, cy: 400 },
    ]

    return (
        <motion.div
            className="concentric-circles-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        >
            <svg
                className="concentric-circles-svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Left circles - bên trái */}
                <g className="left-circles-group">
                    {leftCircles.map((circle, index) => (
                        <motion.circle
                            key={`left-${index}`}
                            cx={circle.cx}
                            cy={circle.cy}
                            r={circle.r}
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.12)"
                            strokeWidth="1.5"
                            opacity={circle.opacity}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: circle.opacity,
                            }}
                            transition={{
                                scale: { duration: 0.8, delay: index * 0.15 + 0.5 },
                                opacity: { duration: 0.6, delay: index * 0.15 + 0.5 },
                            }}
                        />
                    ))}
                </g>

                {/* Right circles - bên phải */}
                <g className="right-circles-group">
                    {rightCircles.map((circle, index) => (
                        <motion.circle
                            key={`right-${index}`}
                            cx={circle.cx}
                            cy={circle.cy}
                            r={circle.r}
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.12)"
                            strokeWidth="1.5"
                            opacity={circle.opacity}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: circle.opacity,
                            }}
                            transition={{
                                scale: { duration: 0.8, delay: index * 0.15 + 0.5 },
                                opacity: { duration: 0.6, delay: index * 0.15 + 0.5 },
                            }}
                        />
                    ))}
                </g>

                {/* Vòng tròn tĩnh bên trái - tạo dải màu liên tục giữa các sóng */}
                {[...Array(0)].map((_, index) => {
                    const baseRadius = 200 + index * 20
                    const opacity = Math.max(0.06, 0.15 - index * 0.0015)
                    return (
                        <circle
                            key={`left-static-${index}`}
                            cx="300"
                            cy="800"
                            r={baseRadius}
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.25)"
                            strokeWidth="1.5"
                            opacity={opacity}
                        />
                    )
                })}

                {/* Radar pulse effect - bên trái - sóng chậm với khoảng cách */}
                {[...Array(8)].map((_, index) => (
                    <motion.circle
                        key={`left-pulse-${index}`}
                        className="radar-pulse-left"
                        cx="300"
                        cy="800"
                        r="200"
                        fill="none"
                        stroke="rgba(0, 0, 0, 0.3)"
                        strokeWidth="2.5"
                        initial={{ opacity: 0 }}
                        animate={{
                            r: [200, 1400],
                            opacity: [0.4, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: index * 1.2,
                            repeatDelay: 0,
                        }}
                    />
                ))}

                {/* Vòng tròn tĩnh bên phải - tạo dải màu liên tục giữa các sóng */}
                {[...Array(0)].map((_, index) => {
                    const baseRadius = 180 + index * 20
                    const opacity = Math.max(0.06, 0.15 - index * 0.0015)
                    return (
                        <circle
                            key={`right-static-${index}`}
                            cx="1600"
                            cy="400"
                            r={baseRadius}
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.25)"
                            strokeWidth="1.5"
                            opacity={opacity}
                        />
                    )
                })}

                {/* Radar pulse effect - bên phải - sóng chậm với khoảng cách */}
                {[...Array(8)].map((_, index) => (
                    <motion.circle
                        key={`right-pulse-${index}`}
                        className="radar-pulse-right"
                        cx="1600"
                        cy="400"
                        r="180"
                        fill="none"
                        stroke="rgba(0, 0, 0, 0.3)"
                        strokeWidth="2.5"
                        initial={{ opacity: 0 }}
                        animate={{
                            r: [180, 1400],
                            opacity: [0.4, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeOut',
                            delay: index * 1.2 + 0.5,
                            repeatDelay: 0,
                        }}
                    />
                ))}
            </svg>
        </motion.div>
    )
}

export default ConcentricCircles
