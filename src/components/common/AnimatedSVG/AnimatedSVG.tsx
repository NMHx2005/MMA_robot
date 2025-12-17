import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './AnimatedSVG.css'

interface Annotation {
    id: string
    text: string
    x: number
    y: number
    anchor?: 'start' | 'middle' | 'end'
}

interface AnimatedSVGProps {
    svgContent?: string // SVG content as string
    svgUrl?: string // URL to SVG file
    paths?: string[] // Array of path data strings
    annotations?: Annotation[]
    duration?: number // Total animation duration
    delay?: number // Delay before starting animation
    strokeColor?: string
    strokeWidth?: number
    onComplete?: () => void
}

const AnimatedSVG = ({
    svgContent,
    svgUrl,
    paths = [],
    annotations = [],
    duration = 2,
    delay = 0,
    strokeColor = '#000000',
    strokeWidth = 2,
    onComplete,
}: AnimatedSVGProps) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!svgRef.current) return

        const svg = svgRef.current
        const allPaths = svg.querySelectorAll<SVGPathElement>('path, line, polyline, polygon, circle, ellipse, rect')
        const timeline = gsap.timeline({ delay, onComplete })

        // Animate each path with stroke-dashoffset
        allPaths.forEach((path, index) => {
            // Get the total length of the path
            let length = 0
            const pathEl = path as SVGElement

            if (pathEl.tagName === 'path') {
                length = (pathEl as SVGPathElement).getTotalLength()
            } else if (pathEl.tagName === 'line') {
                const lineEl = pathEl as SVGLineElement
                const x1 = parseFloat(lineEl.getAttribute('x1') || '0')
                const y1 = parseFloat(lineEl.getAttribute('y1') || '0')
                const x2 = parseFloat(lineEl.getAttribute('x2') || '0')
                const y2 = parseFloat(lineEl.getAttribute('y2') || '0')
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            } else if (pathEl.tagName === 'circle' || pathEl.tagName === 'ellipse') {
                const r = parseFloat(pathEl.getAttribute('r') || pathEl.getAttribute('rx') || '0')
                length = 2 * Math.PI * r
            } else if (pathEl.tagName === 'rect') {
                const width = parseFloat(pathEl.getAttribute('width') || '0')
                const height = parseFloat(pathEl.getAttribute('height') || '0')
                length = 2 * (width + height)
            } else if (pathEl.tagName === 'polyline' || pathEl.tagName === 'polygon') {
                const polyEl = pathEl as SVGPolylineElement | SVGPolygonElement
                const points = polyEl.points
                length = 0
                for (let i = 0; i < points.numberOfItems - 1; i++) {
                    const p1 = points.getItem(i)
                    const p2 = points.getItem(i + 1)
                    length += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
                }
                if (pathEl.tagName === 'polygon') {
                    const p1 = points.getItem(0)
                    const p2 = points.getItem(points.numberOfItems - 1)
                    length += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
                }
            }

            // Set initial stroke properties
            path.style.strokeDasharray = `${length}`
            path.style.strokeDashoffset = `${length}`
            path.style.stroke = strokeColor
            path.style.strokeWidth = `${strokeWidth}`
            path.style.fill = 'none'

            // Calculate duration for this path (proportional to its length)
            const pathDuration = (length / 1000) * duration // Adjust divisor to control speed

            // Animate the path
            timeline.to(
                path,
                {
                    strokeDashoffset: 0,
                    duration: pathDuration,
                    ease: 'none',
                },
                index * 0.1 // Stagger delay between paths
            )
        })

        // Animate annotations after all paths are drawn
        if (annotations.length > 0) {
            annotations.forEach((annotation) => {
                const annotationEl = svg.querySelector(`#annotation-${annotation.id}`)
                if (annotationEl) {
                    timeline.to(
                        annotationEl,
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: 'back.out(1.7)',
                        },
                        `>-0.2` // Start slightly before previous animation ends
                    )
                }
            })
        }

        return () => {
            timeline.kill()
        }
    }, [svgContent, svgUrl, paths, annotations, duration, delay, strokeColor, strokeWidth, onComplete])

    // If SVG content is provided as string, render it directly
    if (svgContent) {
        return (
            <div ref={containerRef} className="animated-svg-container">
                <svg
                    ref={svgRef}
                    className="animated-svg"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                    viewBox="0 0 800 600"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Render annotations */}
                    {annotations.map((annotation) => (
                        <g key={annotation.id} id={`annotation-${annotation.id}`} className="annotation" opacity="0" transform={`translate(${annotation.x}, ${annotation.y}) scale(0.8)`}>
                            <text
                                textAnchor={annotation.anchor || 'middle'}
                                fill="#000"
                                fontSize="14"
                                fontWeight="600"
                                className="annotation-text"
                            >
                                {annotation.text}
                            </text>
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="10"
                                stroke="#000"
                                strokeWidth="1"
                                className="annotation-line"
                            />
                        </g>
                    ))}
                </svg>
            </div>
        )
    }

    // If SVG URL is provided, load it
    if (svgUrl) {
        return (
            <div ref={containerRef} className="animated-svg-container">
                <svg
                    ref={svgRef}
                    className="animated-svg"
                    viewBox="0 0 800 600"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <image href={svgUrl} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" />
                    {/* Render paths if provided */}
                    {paths.map((pathData, idx) => (
                        <path
                            key={`path-${idx}`}
                            d={pathData}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    ))}
                    {/* Render annotations */}
                    {annotations.map((annotation) => (
                        <g key={annotation.id} id={`annotation-${annotation.id}`} className="annotation" opacity="0" transform={`translate(${annotation.x}, ${annotation.y}) scale(0.8)`}>
                            <text
                                textAnchor={annotation.anchor || 'middle'}
                                fill="#000"
                                fontSize="14"
                                fontWeight="600"
                                className="annotation-text"
                            >
                                {annotation.text}
                            </text>
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="10"
                                stroke="#000"
                                strokeWidth="1"
                                className="annotation-line"
                            />
                        </g>
                    ))}
                </svg>
            </div>
        )
    }

    // If only paths are provided, render them
    if (paths.length > 0) {
        return (
            <div ref={containerRef} className="animated-svg-container">
                <svg
                    ref={svgRef}
                    className="animated-svg"
                    viewBox="0 0 800 600"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {paths.map((pathData, idx) => (
                        <path
                            key={`path-${idx}`}
                            d={pathData}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    ))}
                    {/* Render annotations */}
                    {annotations.map((annotation) => (
                        <g key={annotation.id} id={`annotation-${annotation.id}`} className="annotation" opacity="0" transform={`translate(${annotation.x}, ${annotation.y}) scale(0.8)`}>
                            <text
                                textAnchor={annotation.anchor || 'middle'}
                                fill="#000"
                                fontSize="14"
                                fontWeight="600"
                                className="annotation-text"
                            >
                                {annotation.text}
                            </text>
                            <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="10"
                                stroke="#000"
                                strokeWidth="1"
                                className="annotation-line"
                            />
                        </g>
                    ))}
                </svg>
            </div>
        )
    }

    return null
}

export default AnimatedSVG

