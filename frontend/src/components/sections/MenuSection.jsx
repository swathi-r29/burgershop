import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Zap } from 'lucide-react'
import { StarRow } from '../ui/StarIcon'
import { useStore } from '../../store/useStore'
import { menuAPI } from '../../utils/api'
import toast from 'react-hot-toast'

/* ── Fallback data (no emojis) ── */
const FALLBACK_MENU = [
  {
    _id: '1', name: 'Korean Hot & Sweet Crispy Chicken Burger', category: 'Burgers', price: 180,
    description: 'Crispy fried chicken with Korean hot & sweet glaze, fresh lettuce, pickles and signature mayo. The dish that put BAMA\'S on the map.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=85',
    available: true, featured: true, rating: 5.0,
    nutritionInfo: { cal: 520, protein: 32, carbs: 48, fat: 22 },
  },
  {
    _id: '2', name: 'Classic Smash Burger', category: 'Burgers', price: 150,
    description: 'Double-smashed beef patty, American cheese, caramelised onions, pickles and secret burger sauce on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=700&q=85',
    available: true, featured: false, rating: 4.8,
    nutritionInfo: { cal: 620, protein: 38, carbs: 42, fat: 32 },
  },
  {
    _id: '3', name: 'Double Patty Mega Burger', category: 'Burgers', price: 200,
    description: 'Two juicy beef patties, double cheese, jalapeños and house sauce. The ultimate indulgence.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&q=85',
    available: true, featured: true, rating: 4.9,
    nutritionInfo: { cal: 820, protein: 52, carbs: 50, fat: 48 },
  },
  {
    _id: '4', name: 'Veggie Supreme Burger', category: 'Burgers', price: 120,
    description: 'Crispy veggie patty, cucumber, tomato, avocado cream and chipotle mayo. Delicious for everyone.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&q=85',
    available: true, featured: false, rating: 4.5,
    nutritionInfo: { cal: 380, protein: 14, carbs: 52, fat: 14 },
  },
  {
    _id: '5', name: 'Chicken Club Sandwich', category: 'Sandwiches', price: 140,
    description: 'Grilled chicken breast, crisp lettuce, ripe tomatoes, melted cheese and honey mustard on toasted sourdough.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&q=85',
    available: true, featured: false, rating: 4.6,
    nutritionInfo: { cal: 420, protein: 35, carbs: 38, fat: 16 },
  },
  {
    _id: '6', name: 'BLT Supreme Sandwich', category: 'Sandwiches', price: 100,
    description: 'Crispy streaky bacon, heirloom tomatoes, butter lettuce and house-made aioli on artisan sourdough.',
    image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=700&q=85',
    available: true, featured: false, rating: 4.4,
    nutritionInfo: { cal: 350, protein: 20, carbs: 30, fat: 18 },
  },
  {
    _id: '7', name: 'Signature Popcorn Chicken', category: 'Sides', price: 80,
    description: 'Golden crispy popcorn chicken in our signature seasoning. Better than any chain restaurant.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=700&q=85',
    available: true, featured: true, rating: 4.9,
    nutritionInfo: { cal: 280, protein: 18, carbs: 22, fat: 14 },
  },
  {
    _id: '8', name: 'Loaded Crispy Fries', category: 'Sides', price: 60,
    description: 'Golden fries loaded with cheese sauce, jalapeños and special seasoning. Addictively good.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=700&q=85',
    available: true, featured: false, rating: 4.7,
    nutritionInfo: { cal: 320, protein: 6, carbs: 42, fat: 16 },
  },
  {
    _id: '9', name: 'Chilled Soft Drink', category: 'Drinks', price: 40,
    description: 'Ice-cold Cola, Lemon Soda or Mango Punch to complement your meal.',
    image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=700&q=85',
    available: true, featured: false, rating: 4.3,
    nutritionInfo: { cal: 120, protein: 0, carbs: 30, fat: 0 },
  },
]

const CATEGORIES = ['All', 'Burgers', 'Sandwiches', 'Sides', 'Drinks']

/* ── 3D Tilt Card ── */
function MenuCard({ item, index }) {
  const addToCart = useStore((s) => s.addToCart)
  const cardRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -7, y: dx * 7 })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    addToCart(item)
    toast.success(`${item.name.split(' ').slice(0, 2).join(' ')} added.`)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-6px) scale(1.015)' : ''}`,
        transition: hovered
          ? 'transform 0.08s ease'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        borderRadius: '16px',
        background: '#141414',
        border: hovered ? '1px solid rgba(255,122,0,0.35)' : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,122,0,0.08)'
          : '0 4px 24px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '210px' }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        {/* gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(12,12,12,0.95) 0%, transparent 55%)',
          }}
        />

        {/* Featured badge */}
        {item.featured && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ background: 'rgba(255,122,0,0.88)', backdropFilter: 'blur(8px)' }}
          >
            <Zap size={9} strokeWidth={2} />
            Featured
          </div>
        )}

        {!item.available && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white/60"
            style={{ background: 'rgba(40,40,40,0.9)' }}
          >
            Unavailable
          </div>
        )}

        {/* Steam particles on hover */}
        {hovered && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 0, opacity: 0.5, scale: 0.6 }}
                animate={{ y: -28, opacity: 0, scale: 1.4 }}
                transition={{ duration: 1.1, delay: i * 0.22, repeat: Infinity, ease: 'easeOut' }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(255,122,0,0.35)', filter: 'blur(2px)' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-white font-semibold text-sm leading-snug line-clamp-2"
            style={{
              color: hovered ? '#FF7A00' : '#F8F8F8',
              transition: 'color 0.3s ease',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.01em',
            }}
          >
            {item.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            <StarRow rating={item.rating} size={11} />
          </div>
        </div>

        <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: '#888888' }}>
          {item.description}
        </p>

        {/* Nutrition — reveals on hover */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: hovered ? '60px' : '0',
            opacity: hovered ? 1 : 0,
            transition: 'max-height 0.35s ease, opacity 0.3s ease',
            marginBottom: hovered ? '12px' : '0',
          }}
        >
          <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            {[
              { l: 'Cal', v: item.nutritionInfo?.cal },
              { l: 'Pro', v: `${item.nutritionInfo?.protein}g` },
              { l: 'Carbs', v: `${item.nutritionInfo?.carbs}g` },
              { l: 'Fat', v: `${item.nutritionInfo?.fat}g` },
            ].map(({ l, v }) => (
              <div key={l} className="flex-1 text-center">
                <p style={{ fontSize: '9px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</p>
                <p className="text-white/70 font-medium" style={{ fontSize: '11px' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="font-black"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.5rem',
              color: '#FF7A00',
              letterSpacing: '0.04em',
            }}
          >
            &#8377;{item.price}
          </span>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            disabled={!item.available}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white disabled:opacity-30 transition-all duration-300"
            style={{
              background: hovered && item.available
                ? 'linear-gradient(135deg, #FF7A00, #FF4500)'
                : 'rgba(255,122,0,0.12)',
              border: '1px solid rgba(255,122,0,0.28)',
              boxShadow: hovered && item.available ? '0 0 18px rgba(255,122,0,0.3)' : 'none',
            }}
          >
            <Plus size={11} strokeWidth={2.2} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function MenuSection({ limit }) {
  const [items, setItems] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    menuAPI.getAll()
      .then((res) => setItems(res.data.data || res.data))
      .catch(() => setItems(FALLBACK_MENU))
      .finally(() => setLoading(false))
  }, [])

  const filtered = items.filter((i) => activeCategory === 'All' || i.category === activeCategory)
  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section id="menu" className="section-pad relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(255,122,0,0.025) 0%, transparent 55%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.4em] uppercase mb-3"
              style={{ color: '#FF7A00' }}
            >
              Our Menu
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="leading-none text-white"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                letterSpacing: '0.06em',
              }}
            >
              WHAT ARE YOU
              <br />
              <span className="gradient-text-fire">CRAVING?</span>
            </motion.h2>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-300"
                style={
                  activeCategory === cat
                    ? {
                        background: 'linear-gradient(135deg, #FF7A00, #FF4500)',
                        color: '#FFFFFF',
                        boxShadow: '0 0 22px rgba(255,122,0,0.35)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.4)',
                      }
                }
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 rounded-2xl animate-pulse"
                    style={{ background: 'rgba(255,255,255,0.03)' }} />
                ))
              : displayed.map((item, i) => (
                  <MenuCard key={item._id} item={item} index={i} />
                ))
            }
          </motion.div>
        </AnimatePresence>

        {limit && filtered.length > limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <a
              href="/menu"
              className="px-12 py-3.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              style={{
                border: '1px solid rgba(255,122,0,0.35)',
                color: '#FF7A00',
                background: 'transparent',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,122,0,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              View Full Menu
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export { FALLBACK_MENU }
