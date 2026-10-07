import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react'

const MARQUEE_ITEMS = [
  "BAMA'S BURGER BOX", '4.7 / 5 STARS', 'KOVILPATTI', 'WOMEN-OWNED',
  'BEST BURGERS IN TOWN', '₹1–₹200', 'OPEN TILL 10:30 PM', 'DINE IN AVAILABLE',
]

export default function OrderSection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Marquee Banner */}
      <div
        className="py-4 overflow-hidden border-y"
        style={{
          background: 'linear-gradient(90deg, #FF7A00, #FF4500, #FF7A00)',
          borderColor: 'rgba(255,122,0,0.25)',
        }}
      >
        <div className="marquee-container">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
              <span key={i} className="mx-8 text-white font-bold text-sm tracking-widest uppercase opacity-90" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1rem' }}>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="section-pad relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom, rgba(255,107,0,0.05), transparent 60%)' }}
        />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-orange text-xs tracking-[0.4em] uppercase mb-4"
              >
                Ready to Order?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[clamp(3rem,8vw,6rem)] leading-none text-white mb-8"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                THE BURGER
                <br />
                <span className="gradient-text-fire">EXPERIENCE</span>
                <br />
                <span style={{ color: '#F8F8F8', fontSize: '0.6em', letterSpacing: '0.18em' }}>STARTS HERE.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Phone */}
                <a
                  href="tel:+917708704534"
                  className="flex items-center gap-5 p-5 rounded-2xl contact-card group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 contact-icon"
                    style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.18)' }}>
                    <Phone size={20} strokeWidth={1.75} style={{ color: '#FF7A00' }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Call us</p>
                    <p className="text-white font-bold group-hover:text-orange transition-colors" style={{ fontSize: '1.15rem' }}>
                      077087 04534
                    </p>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.75} style={{ color: '#FF7A00', marginLeft: 'auto', opacity: 0 }} className="group-hover:opacity-100 transition-opacity" />
                </a>

                {/* Address */}
                <div className="flex items-center gap-5 p-5 rounded-2xl contact-card">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 contact-icon"
                    style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.18)' }}>
                    <MapPin size={20} strokeWidth={1.75} style={{ color: '#FF7A00' }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Location</p>
                    <p className="text-white font-medium text-sm">10, Ettayapuram Road</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Kovilpatti, Tamil Nadu 641005</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-5 p-5 rounded-2xl contact-card">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 contact-icon"
                    style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.18)' }}>
                    <Clock size={20} strokeWidth={1.75} style={{ color: '#FF7A00' }} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Hours</p>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#66D17A' }} />
                      <p className="text-white font-medium text-sm">Open · Closes 10:30 PM</p>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Dine-in available</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right — CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                className="rounded-3xl p-10 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,122,0,0.07), rgba(255,69,0,0.04))',
                  border: '1px solid rgba(255,122,0,0.18)',
                  boxShadow: '0 0 70px rgba(255,122,0,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Decorative glow */}
                <div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(255,122,0,0.12), transparent)',
                    filter: 'blur(50px)',
                  }}
                />

                <div className="relative z-10">
                  {/* Cinematic food image instead of emoji */}
                  <div className="w-full h-48 rounded-2xl overflow-hidden mb-7">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85"
                      alt="Signature burger"
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(0.85)' }}
                    />
                  </div>

                  <h3
                    className="text-white font-bold text-center mb-2 tracking-[0.1em]"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.2rem' }}
                  >
                    HUNGRY NOW?
                  </h3>
                  <p className="text-center text-sm mb-8" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Call us or walk in — we'll have it hot and ready.
                  </p>

                  <a
                    href="tel:+917708704534"
                    className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl text-white font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-300 mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #FF7A00, #FF4500)',
                      boxShadow: '0 0 40px rgba(255,122,0,0.35)',
                    }}
                  >
                    <Phone size={16} strokeWidth={1.75} />
                    Call to Order
                  </a>

                  <a
                    href="https://maps.google.com/maps?q=10+Ettayapuram+Rd+Kovilpatti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl glass text-white/60 text-sm font-medium hover:text-white transition-colors border border-white/5"
                  >
                    <MapPin size={14} />
                    Get Directions
                  </a>

                  {/* Price badge */}
                  <div className="mt-6 flex items-center justify-center gap-3 text-center">
                    <span className="text-white/30 text-xs">Price range:</span>
                    <span className="text-gold text-sm font-bold">₹1 — ₹200</span>
                    <span className="text-white/30 text-xs">per person</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
