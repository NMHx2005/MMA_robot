import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import DataPlatform from './pages/DataPlatform'
import UseCases from './pages/UseCases'
import TechnologyStack from './pages/TechnologyStack'
import Partners from './pages/Partners'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
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

  return (
    <>
      <LoadingScreen onComplete={handleLoadingComplete} />
      {!isLoading && (
        <>
          <CustomCursor />
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
