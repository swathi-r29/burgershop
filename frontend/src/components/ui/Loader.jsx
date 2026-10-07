import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store/useStore'

/** Premium cinematic loader — no CSS cartoon burger, no emojis */
export default function Loader() {
  const setLoading = useStore((s) => s.setLoading)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3400)
    return () => clearTimeout(timer)
  }, [setLoading])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: '#0A0A0A' }}
    >
      {/* Cinematic ring */}
      <div className="relative mb-12">
        {/* Outer slow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full absolute inset-0"
          style={{ border: '1px solid rgba(255,122,0,0.2)' }}
        />
        {/* Inner fast arc */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full relative"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#FF7A00',
            borderRightColor: 'rgba(255,122,0,0.3)',
          }}
        />
        {/* Center dot */}
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: '#FF7A00', boxShadow: '0 0 16px rgba(255,122,0,0.7)' }}
          />
        </div>
      </div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center"
      >
        <h1
          className="gradient-text-fire tracking-[0.14em]"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          }}
        >
          BAMA'S BURGER BOX
        </h1>
        <p
          className="mt-2 tracking-[0.3em] uppercase"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '0.7rem',
            color: '#888888',
            fontStyle: 'italic',
          }}
        >
          Kovilpatti · Tamil Nadu
        </p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 w-44 h-px overflow-hidden rounded-full"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.9, duration: 2.2, ease: 'easeInOut' }}
          className="h-full loading-bar"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 tracking-[0.35em] uppercase"
        style={{ fontSize: '9px', color: '#555555' }}
      >
        Crafting your experience...
      </motion.p>
    </motion.div>
  )
}
