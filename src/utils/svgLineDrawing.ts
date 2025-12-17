// Utility functions for SVG line drawing animations
import { gsap } from 'gsap'

/**
 * Animate SVG paths using stroke-dashoffset technique
 * This creates the effect of lines being drawn
 */
export const animateSVGPaths = (
    svgElement: SVGSVGElement | null,
    options: {
        duration?: number
        delay?: number
        stagger?: number
        ease?: string
        strokeColor?: string
        strokeWidth?: number
        onComplete?: () => void
    } = {}
) => {
    if (!svgElement) return null

    const {
        duration = 2,
        delay = 0,
        stagger = 0.1,
        ease = 'none',
        strokeColor = '#000000',
        strokeWidth = 2,
        onComplete,
    } = options

    const paths = svgElement.querySelectorAll<SVGPathElement>('path, line, polyline, polygon')
    const timeline = gsap.timeline({ delay, onComplete })

    paths.forEach((path, index) => {
        // Get path length
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

        // Calculate duration for this path
        const pathDuration = (length / 1000) * duration

        // Animate
        timeline.to(
            path,
            {
                strokeDashoffset: 0,
                duration: pathDuration,
                ease,
            },
            index * stagger
        )
    })

    return timeline
}

/**
 * Animate annotations to appear after paths are drawn
 */
export const animateAnnotations = (
    svgElement: SVGSVGElement | null,
    annotationIds: string[],
    options: {
        delay?: number
        stagger?: number
        onComplete?: () => void
    } = {}
) => {
    if (!svgElement) return null

    const { delay = 0, stagger = 0.1, onComplete } = options
    const timeline = gsap.timeline({ delay, onComplete })

    annotationIds.forEach((id, index) => {
        const annotation = svgElement.querySelector(`#annotation-${id}`)
        if (annotation) {
            // Set initial state
            gsap.set(annotation, { opacity: 0, scale: 0.8 })

            // Animate in
            timeline.to(
                annotation,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                },
                index * stagger
            )
        }
    })

    return timeline
}

/**
 * Extract paths from SVG string
 */
export const extractPathsFromSVG = (svgString: string): string[] => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const paths = doc.querySelectorAll('path')
    return Array.from(paths).map((path) => path.getAttribute('d') || '')
}

/**
 * Convert SVG image to paths (requires manual conversion or external tool)
 * This is a placeholder - actual conversion requires specialized tools
 */
export const convertSVGImageToPaths = async (): Promise<string[]> => {
    // This would require:
    // 1. Loading the SVG
    // 2. Using a tool like Potrace, AutoTrace, or Inkscape to vectorize
    // 3. Extracting the paths
    // For now, return empty array - user needs to provide paths manually
    console.warn('SVG to paths conversion requires manual work or external tools')
    return []
}

