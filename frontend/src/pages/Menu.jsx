import { motion } from 'framer-motion'
import MenuSection from '../components/sections/MenuSection'
import Footer from '../components/ui/Footer'

export default function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Menu Hero Header */}
      <div
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(255,107,0,0.05) 0%, transparent 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-orange text-xs tracking-[0.4em] uppercase mb-3"
          >
            Full Menu
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.5rem,10vw,9rem)] leading-none text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            THE{' '}
            <span className="gradient-text-fire">FULL</span>
            <br />
            <span className="gradient-text-orange">LINEUP</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/40 text-sm mt-4 max-w-md"
          >
            Every item made fresh, served hot. Priced between ₹1–₹200 so everyone can enjoy BAMA'S quality.
          </motion.p>
        </div>

        {/* Decorative lines */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.3), transparent)' }}
        />
      </div>

      {/* Full Menu Section */}
      <MenuSection />

      <Footer />
    </motion.div>
  )
}
