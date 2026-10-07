import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu as MenuIcon, X, Phone } from 'lucide-react'
import { useStore } from '../../store/useStore'
import CartDrawer from './CartDrawer'

const navLinks = [
  { label: 'Menu', to: '/menu' },
  { label: 'Story', to: '/#story' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const cartCount = useStore((s) => s.cartCount())
  const toggleCart = useStore((s) => s.toggleCart)
  const isCartOpen = useStore((s) => s.isCartOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9990] transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange to-red opacity-90 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px' }}>BB</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                BAMA'S
              </p>
              <p className="text-orange text-[10px] tracking-[0.25em] leading-none uppercase">
                Burger Box
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className={`text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:text-orange relative group ${
                  location.pathname === to ? 'text-orange' : 'text-white/60'
                }`}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-full glass-orange hover:scale-110 transition-transform duration-200"
            >
              <ShoppingCart size={18} className="text-orange" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Order CTA */}
            <a
              href="tel:+917708704534"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 text-white"
              style={{
                background: 'linear-gradient(135deg, #FF7A00, #FF4500)',
                boxShadow: '0 0 20px rgba(255,122,0,0.35)',
              }}
            >
              Order Now
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-white"
            >
              {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9989] flex flex-col items-center justify-center"
            style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map(({ label, to }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl text-white hover:text-orange transition-colors duration-200"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                href="tel:+917708704534"
                className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold tracking-widest uppercase text-sm"
                style={{ background: 'linear-gradient(135deg, #FF7A00, #FF4500)' }}
              >
                <Phone size={14} strokeWidth={1.75} />
                077087 04534
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
