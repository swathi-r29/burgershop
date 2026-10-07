import React, { Suspense, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Menu from './pages/Menu'
import ItemDetail from './pages/ItemDetail'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Navbar from './components/ui/Navbar'
import Loader from './components/ui/Loader'
import CustomCursor from './components/ui/CustomCursor'
import { useStore } from './store/useStore'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<ItemDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  const lenisRef = useRef(null)
  const { isLoading } = useStore()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <div className="noise">
        <CustomCursor />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#141414',
              color: '#fff',
              border: '1px solid rgba(255,107,0,0.3)',
            },
          }}
        />
        {isLoading && <Loader />}
        <Suspense fallback={<Loader />}>
          <AppContent />
        </Suspense>
      </div>
    </Router>
  )
}
