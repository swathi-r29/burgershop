import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Star, Phone } from 'lucide-react'
import { menuAPI } from '../utils/api'
import { FALLBACK_MENU } from '../components/sections/MenuSection'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'
import Footer from '../components/ui/Footer'

export default function ItemDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const addToCart = useStore((s) => s.addToCart)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await menuAPI.getById(id)
        setItem(res.data.data || res.data)
      } catch {
        setItem(FALLBACK_MENU.find((i) => i._id === id) || null)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-orange/30 border-t-orange animate-spin" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255,122,0,0.08)', border: '1px solid rgba(255,122,0,0.15)' }}
      >
        <Star size={28} strokeWidth={1.5} style={{ color: 'rgba(255,122,0,0.5)' }} />
      </div>
        <p className="text-white/50">Item not found</p>
        <Link to="/menu" className="text-orange hover:underline text-sm">← Back to Menu</Link>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #080808 10%, rgba(8,8,8,0.4) 50%, transparent)' }}
        />

        {/* Back button */}
        <Link
          to="/menu"
          className="absolute top-24 left-6 flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 text-sm hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Menu
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10 pb-20">
        {/* Item Info Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="rounded-3xl p-8 mb-8"
          style={{ background: 'rgba(20,20,20,0.95)', border: '1px solid rgba(255,107,0,0.2)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs text-orange/80 tracking-wider uppercase"
                  style={{ background: 'rgba(255,107,0,0.1)' }}>
                  {item.category}
                </span>
                {item.featured && (
                  <span className="px-3 py-1 rounded-full text-xs text-yellow-400 tracking-wider uppercase"
                    style={{ background: 'rgba(255,215,0,0.1)' }}>
                    ⚡ Featured
                  </span>
                )}
              </div>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">{item.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-gold fill-gold" />
              <span className="text-gold font-bold">{item.rating || '4.8'}</span>
            </div>
          </div>

          <p className="text-white/50 text-sm leading-relaxed mb-8">{item.description}</p>

          {/* Nutrition Grid */}
          {item.nutritionInfo && (
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Calories', value: item.nutritionInfo.cal, unit: 'kcal' },
                { label: 'Protein', value: item.nutritionInfo.protein, unit: 'g' },
                { label: 'Carbs', value: item.nutritionInfo.carbs, unit: 'g' },
                { label: 'Fat', value: item.nutritionInfo.fat, unit: 'g' },
              ].map(({ label, value, unit }) => (
                <div
                  key={label}
                  className="text-center p-4 rounded-2xl"
                  style={{ background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.1)' }}
                >
                  <p className="text-white font-black text-2xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    {value}
                    <span className="text-sm font-normal text-white/40">{unit}</span>
                  </p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-orange font-black text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              ₹{item.price}
            </p>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { addToCart(item); toast.success('Added to cart!') }}
                className="flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, #FF6B00, #FF2D20)',
                  boxShadow: '0 0 30px rgba(255,107,0,0.4)',
                }}
              >
                <Plus size={16} />
                Add to Cart
              </motion.button>
              <a
                href="tel:+917708704534"
                className="px-8 py-4 rounded-full glass border border-orange/30 text-orange text-sm font-semibold tracking-widest uppercase hover:bg-orange/10 transition-all flex items-center gap-2"
                style={{ borderColor: 'rgba(255,122,0,0.3)' }}
              >
                <Phone size={14} strokeWidth={1.75} />
                Order Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* Ingredients tags */}
        {item.ingredients && item.ingredients.length > 0 && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs text-white/60 glass">
                  {ing}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  )
}
