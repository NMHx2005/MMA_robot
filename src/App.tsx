import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import DataPlatform from './pages/DataPlatform/DataPlatform'
import UseCases from './pages/UseCases/UseCases'
import TechnologyStack from './pages/TechnologyStack/TechnologyStack'
import Partners from './pages/Partners/Partners'
import LoadingScreen from './components/common/LoadingScreen/LoadingScreen'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Add loading class to html
    if (isLoading) {
      document.documentElement.classList.add('loading')
    } else {
      document.documentElement.classList.remove('loading')
    }
  }, [isLoading])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Smooth inertia scroll (desktop only, light-weight)
  useEffect(() => {
    if (isLoading) return
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return

    let target = window.scrollY
    let current = window.scrollY
    let rafId: number | null = null
    const ease = 0.08

    const clampTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      target = Math.max(0, Math.min(target, maxScroll))
    }

    const animate = () => {
      const diff = target - current
      current += diff * ease
      window.scrollTo(0, current)
      if (Math.abs(diff) > 0.4) {
        rafId = requestAnimationFrame(animate)
      } else {
        current = target
        rafId = null
      }
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      target += event.deltaY
      clampTarget()
      if (!rafId) rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isLoading])

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      {!isLoading && (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/data-platform" element={<DataPlatform />} />
              <Route path="/use-cases" element={<UseCases />} />
              <Route path="/technology-stack" element={<TechnologyStack />} />
              <Route path="/partners" element={<Partners />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  )
}

export default App
