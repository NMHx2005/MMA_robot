import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import './AnimatedSVG.css'

interface Annotation {
    id: string
    text: string
    x: number
    y: number
    anchor?: 'start' | 'middle' | 'end'
}

interface RobotSVGProps {
    annotations?: Annotation[]
    duration?: number
    delay?: number
    strokeColor?: string
    strokeWidth?: number
    onComplete?: () => void
}

const RobotSVG = ({
    annotations = [],
    duration = 4,
    delay = 0.1,
    strokeColor = '#000000',
    strokeWidth = 0.5,
    onComplete,
}: RobotSVGProps) => {
    gsap.registerPlugin(DrawSVGPlugin)
    const containerRef = useRef<HTMLDivElement>(null)
    const [svgContent, setSvgContent] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isReady, setIsReady] = useState(false)

    // Load SVG content
    useEffect(() => {
        const loadSVG = async () => {
            try {
                const response = await fetch('/robot.svg')
                if (!response.ok) {
                    throw new Error(`Failed to fetch SVG: ${response.statusText}`)
                }
                const svgText = await response.text()
                setSvgContent(svgText)
            } catch (error) {
                console.error('Error loading SVG:', error)
                setSvgContent(null)
            } finally {
                setIsLoading(false)
            }
        }

        loadSVG()
    }, [])

    // Process SVG and prepare for animation
    useEffect(() => {
        if (!svgContent || !containerRef.current) return

        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml')
        const svgElement = svgDoc.documentElement

        // Normalize sizing to fit container
        const viewBox = svgElement.getAttribute('viewBox') || svgElement.getAttribute('viewbox')
        const widthAttr = svgElement.getAttribute('width')
        const heightAttr = svgElement.getAttribute('height')
        if (!viewBox && widthAttr && heightAttr) {
            // Derive viewBox from width/height if missing
            svgElement.setAttribute('viewBox', `0 0 ${widthAttr} ${heightAttr}`)
        }
        svgElement.setAttribute('width', '100%')
        svgElement.setAttribute('height', '100%')
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet')

        // Find all paths and prepare them for animation
        const allPaths = svgElement.querySelectorAll('path')
        allPaths.forEach((path) => {
            // Only remove fill if path has stroke (line drawing paths)
            // Keep original fill if path doesn't have stroke (filled shapes)
            const hasStroke = path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none'
            if (hasStroke) {
                // This is a line path - remove fill for line drawing effect
                path.setAttribute('fill', 'none')
            }
            // Otherwise keep original fill

            // Ensure paths have stroke (only if missing and it's a line path)
            if (!path.getAttribute('stroke') || path.getAttribute('stroke') === 'none') {
                // Only set stroke if path doesn't have fill (it's meant to be a line)
                if (!path.getAttribute('fill') || path.getAttribute('fill') === 'none') {
                    path.setAttribute('stroke', strokeColor)
                }
            }
            // Keep original stroke color if it exists

            // Set stroke-width only if missing (preserve original thin strokes)
            if (!path.getAttribute('stroke-width') && hasStroke) {
                path.setAttribute('stroke-width', strokeWidth.toString())
            }
            // Keep original stroke-width if it exists (may be thinner than default)
        })

        // Also remove fill from groups
        const allGroups = svgElement.querySelectorAll('g')
        allGroups.forEach((group) => {
            if (group.getAttribute('fill') && group.getAttribute('fill') !== 'none') {
                group.removeAttribute('fill')
            }
        })

        // Add annotations to SVG (will fade in later)
        annotations.forEach((annotation) => {
            const annotationGroup = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'g')
            annotationGroup.setAttribute('id', `annotation-${annotation.id}`)
            annotationGroup.setAttribute('class', 'annotation')
            annotationGroup.setAttribute('opacity', '0')
            annotationGroup.setAttribute('transform', `translate(${annotation.x}, ${annotation.y})`)

            const text = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text')
            text.setAttribute('text-anchor', annotation.anchor || 'middle')
            text.setAttribute('fill', '#000')
            text.setAttribute('font-size', '14')
            text.setAttribute('font-weight', '600')
            text.setAttribute('class', 'annotation-text')
            text.textContent = annotation.text

            const line = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute('x1', '0')
            line.setAttribute('y1', '0')
            line.setAttribute('x2', '0')
            line.setAttribute('y2', '10')
            line.setAttribute('stroke', '#000')
            line.setAttribute('stroke-width', '0.5')
            line.setAttribute('class', 'annotation-line')

            annotationGroup.appendChild(text)
            annotationGroup.appendChild(line)
            svgElement.appendChild(annotationGroup)
        })

        // Inject CSS to prepare paths for animation
        const style = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style')
        style.textContent = `
            path {
                stroke-linecap: round;
                stroke-linejoin: round;
                fill: none !important;
            }
            g {
                fill: none !important;
            }
            text {
                fill: #000 !important;
            }
        `
        svgElement.insertBefore(style, svgElement.firstChild)

        // Get the modified SVG as string
        const serializer = new XMLSerializer()
        const modifiedSvgContent = serializer.serializeToString(svgElement)

        // Render SVG
        if (containerRef.current) {
            containerRef.current.innerHTML = modifiedSvgContent
            setIsReady(true)
        }
    }, [svgContent, annotations, strokeColor, strokeWidth])

    // Animate paths after SVG is rendered
    useEffect(() => {
        if (!isReady || !containerRef.current) return

        const container = containerRef.current
        const svg = container.querySelector('svg') as SVGSVGElement
        if (!svg) return

        // Hide SVG to prevent initial flash before setup
        svg.style.visibility = 'hidden'

        let timeline: gsap.core.Timeline | null = null
        let rafId2: number | null = null
        let rafId3: number | null = null

        // Use requestAnimationFrame to ensure DOM is ready
        const rafId = requestAnimationFrame(() => {
            // Double RAF to ensure layout is complete
            rafId2 = requestAnimationFrame(() => {
                // Find all path elements
                const allPaths = svg.querySelectorAll<SVGPathElement>('path')
                if (allPaths.length === 0) {
                    console.warn('No paths found in SVG')
                    return
                }

                console.log(`Found ${allPaths.length} paths total`)

                const pathsArray = Array.from(allPaths)
                // Very small stagger for smooth, continuous drawing effect
                const STAGGER_DELAY = 0.0005

                // Collect all paths with stroke for animation (no core/detail separation)
                const pathsToAnimate: { path: SVGPathElement; length: number; index: number }[] = []

                pathsArray.forEach((path, index) => {
                    try {
                        const hasStroke = path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none'
                        if (!hasStroke) {
                            // Skip paths without stroke (filled shapes) - they should display as-is
                            return
                        }

                        // Only include paths with meaningful length (filter out tiny artifacts)
                        const length = path.getTotalLength()
                        // Increase threshold to hide tiny dots/noise
                        if (length > 12 && !isNaN(length)) { // Minimum 12px to avoid tiny artifacts
                            pathsToAnimate.push({ path, length, index })
                        }
                    } catch (error) {
                        // Skip invalid paths
                    }
                })

                console.log(`Animating ${pathsToAnimate.length} paths (from ${allPaths.length} total)`)

                // Prepare all paths for animation
                pathsToAnimate.forEach(({ path }) => {
                    // Prepare for drawSVG animation
                    gsap.set(path, {
                        drawSVG: '0%',
                        fill: 'none',
                        opacity: 1,
                    })

                    // Set stroke and width - use lighter, thinner strokes
                    let currentStroke = path.getAttribute('stroke')
                    if (!currentStroke || currentStroke === 'none') {
                        currentStroke = strokeColor
                        path.setAttribute('stroke', currentStroke)
                    }

                    // Use thinner stroke width for more delicate appearance
                    const currentWidth = parseFloat(path.getAttribute('stroke-width') || '0')
                    if (currentWidth === 0 || currentWidth > strokeWidth) {
                        path.setAttribute('stroke-width', strokeWidth.toString())
                    }
                })

                // Handle paths without stroke (filled shapes) - keep original
                pathsArray.forEach((path) => {
                    const hasStroke = path.getAttribute('stroke') && path.getAttribute('stroke') !== 'none'
                    if (!hasStroke) {
                        path.style.opacity = '1'
                        // Keep original fill and stroke
                    }
                })

                // Wait a frame to ensure all paths are prepared before animating
                rafId3 = requestAnimationFrame(() => {
                    // Create timeline with smooth, gentle animation
                    timeline = gsap.timeline({ delay, onComplete })

                    // Animate ALL paths with stroke (no core/detail separation)
                    // Use gentle ease and proportional duration based on path length
                    pathsToAnimate.forEach(({ path, length }, animIndex) => {
                        try {
                            // Calculate duration based on path length for natural drawing speed
                            const pathDuration = Math.max(0.1, Math.min(0.8, (length / 2000) * duration))

                            timeline!.to(
                                path,
                                {
                                    drawSVG: '100%',
                                    duration: pathDuration,
                                    ease: 'power1.out', // Gentle, smooth ease
                                },
                                animIndex * STAGGER_DELAY
                            )
                        } catch (error) {
                            console.error(`Error animating path ${animIndex}:`, error)
                        }
                    })

                    // Animate annotations fade in gently after paths are done
                    if (annotations.length > 0 && timeline) {
                        const totalAnimationDuration = pathsToAnimate.length * STAGGER_DELAY + duration
                        annotations.forEach((annotation, idx) => {
                            const annotationEl = svg.querySelector(`#annotation-${annotation.id}`)
                            if (annotationEl) {
                                timeline!.to(
                                    annotationEl,
                                    {
                                        opacity: 1,
                                        duration: 0.8, // Gentle fade
                                        ease: 'power2.out',
                                    },
                                    totalAnimationDuration + idx * 0.2
                                )
                            }
                        })
                    }

                    // Show SVG after setup to avoid initial flash
                    svg.style.visibility = 'visible'
                })
            })
        })

        return () => {
            cancelAnimationFrame(rafId)
            if (rafId2 !== null) {
                cancelAnimationFrame(rafId2)
            }
            if (rafId3 !== null) {
                cancelAnimationFrame(rafId3)
            }
            if (timeline) {
                timeline.kill()
            }
        }
    }, [isReady, annotations, duration, delay, strokeColor, strokeWidth, onComplete])

    if (isLoading) {
        return (
            <div className="animated-svg-container">
                <div style={{ color: '#666' }}>Loading robot sketch...</div>
            </div>
        )
    }

    if (!svgContent) {
        return (
            <div className="animated-svg-container">
                <div style={{ color: '#999' }}>Error loading SVG</div>
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="animated-svg-container"
        />
    )
}

export default RobotSVG

