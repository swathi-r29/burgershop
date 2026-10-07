import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { StarRow } from '../ui/StarIcon'

const REVIEWS = [
  {
    id: 1,
    name: 'S P',
    rating: 5,
    time: '2 months ago',
    reviews: '2 reviews',
    text: 'Way better than any burger in town especially better than KFC! and other so called chain restaurants. The burger is bigger, there is more chicken, cheaper in price and the food is actually hot! Better popcorn chicken, and the service is excellent.',
    highlight: true,
  },
  {
    id: 2,
    name: 'Vasusudhan Valluvan',
    rating: 5,
    time: 'a month ago',
    reviews: '10 reviews',
    text: 'Loved the food here! Food 5/5. Service 5/5. Atmosphere 5/5. Would definitely recommend to everyone in Kovilpatti!',
    highlight: false,
  },
  {
    id: 3,
    name: 'ILASAI VENDHAN',
    rating: 5,
    time: '3 months ago',
    reviews: '6 reviews',
    badge: 'Local Guide',
    text: 'So nice and good delicious. Dine-in experience was amazing. The ambiance is great and food quality is top notch. Best burger place in Kovilpatti without a doubt.',
    highlight: false,
  },
  {
    id: 4,
    name: 'Arjun R.',
    rating: 5,
    time: '1 month ago',
    reviews: '3 reviews',
    text: 'Tried the Korean Hot & Sweet Crispy Chicken Burger — absolutely mind blowing! The sauce is perfectly balanced. Will come back again and again.',
    highlight: false,
  },
  {
    id: 5,
    name: 'Priya M.',
    rating: 5,
    time: '2 weeks ago',
    reviews: '1 review',
    text: 'Taste and quality wise excellent. Portions are huge for the price. Definitely the best value food in the entire area!',
    highlight: false,
  },
]

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateY: 2, transition: { duration: 0.4 } }}
      className="review-card relative rounded-2xl p-7 overflow-hidden group"
      style={{
        transformStyle: 'preserve-3d',
        background: 'rgba(15,15,15,0.9)',
        border: review.highlight
          ? '1px solid rgba(255,122,0,0.35)'
          : '1px solid rgba(255,255,255,0.05)',
        boxShadow: review.highlight
          ? '0 0 50px rgba(255,122,0,0.1), inset 0 0 40px rgba(255,122,0,0.015)'
          : '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* Glow background for highlighted */}
      {review.highlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top left, rgba(255,122,0,0.06), transparent 65%)',
          }}
        />
      )}

      {/* Opening quotation — typographic, not emoji */}
      <span
        className="absolute top-5 right-6 leading-none pointer-events-none select-none"
        style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: '4.5rem',
          color: 'rgba(255,122,0,0.08)',
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        &#8220;
      </span>

      {/* SVG Stars */}
      <StarRow rating={review.rating} size={13} />

      {/* Review text */}
      <p className="mt-4 text-sm leading-relaxed relative z-10"
        style={{ color: 'rgba(240,240,240,0.65)' }}>
        {review.highlight ? (
          <>
            <span style={{ color: '#FF7A00', fontWeight: 600 }}>
              "Way better than any burger in town
            </span>
            <span style={{ color: 'rgba(240,240,240,0.5)' }}>
              {' '}especially better than KFC!
            </span>
            {review.text.slice(review.text.indexOf('!') + 1)}
          </>
        ) : (
          `"${review.text}"`
        )}
      </p>

      {/* Author */}
      <div className="flex items-center justify-between mt-6 pt-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #FF7A00, #FF4500)' }}
          >
            {review.name[0]}
          </div>
          <div>
            <p className="text-white font-semibold text-xs">{review.name}</p>
            <div className="flex items-center gap-1.5">
              {review.badge && (
                <span className="text-[9px] tracking-wider"
                  style={{ color: '#FF7A00' }}>{review.badge} ·</span>
              )}
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {review.reviews} · {review.time}
              </p>
            </div>
          </div>
        </div>
        <span className="text-[10px] tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Google
        </span>
      </div>
    </motion.div>
  )
}

export default function ReviewsSection() {
  const sectionRef = useRef()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section ref={sectionRef} id="reviews" className="section-pad relative overflow-hidden">

      {/* Background — warm amber tint, not gold */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 30%, rgba(244,185,66,0.025) 0%, transparent 55%)',
        }}
      />

      {/* Floating smoke orbs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${80 + i * 35}px`,
            height: `${80 + i * 35}px`,
            left: `${8 + i * 21}%`,
            top: `${18 + i * 16}%`,
            background: 'radial-gradient(ellipse, rgba(255,122,0,0.035), transparent)',
            filter: 'blur(22px)',
          }}
          animate={{ y: [0, -18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.55 }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] tracking-[0.4em] uppercase mb-3"
            style={{ color: '#FF7A00' }}
          >
            What People Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="leading-none text-white"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              letterSpacing: '0.06em',
            }}
          >
            KOVILPATTI{' '}
            <span style={{
              background: 'linear-gradient(135deg, #F4B942, #FF7A00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              LOVES US
            </span>
          </motion.h2>

          {/* Big rating display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.7, type: 'spring', stiffness: 100 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            <div className="text-right">
              <p
                className="leading-none font-black"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(4rem, 8vw, 5.5rem)',
                  background: 'linear-gradient(135deg, #F4B942, #FF7A00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                4.7
              </p>
              <p className="text-[10px] tracking-[0.3em] uppercase mt-1"
                style={{ color: 'rgba(255,255,255,0.25)' }}>out of 5</p>
            </div>
            <div className="w-px h-16" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="text-left">
              <StarRow rating={4.7} size={22} />
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>31 Google Reviews</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>Based on verified visits</p>
            </div>
          </motion.div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, i) => (
            <motion.div key={review.id} style={{ y: i % 2 === 0 ? y1 : y2 }}>
              <ReviewCard review={review} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Google badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-7 py-3 rounded-full glass text-[11px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            <StarRow rating={5} size={11} />
            View All Reviews on Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  )
}
