import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Flame, Coins, Crown, Phone } from 'lucide-react'
import { StarRow } from '../ui/StarIcon'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '4.7', label: 'Star Rating', suffix: '' },
  { value: '31', label: 'Happy Reviews', suffix: '+' },
  { value: '200', label: 'Max Price (₹)', suffix: '' },
  { value: '10', label: 'Menu Items', suffix: '+' },
]

const timelineItems = [
  {
    Icon: Award,
    title: 'Women-Owned & Proud',
    desc: 'Founded by a passionate entrepreneur in the heart of Kovilpatti, Tamil Nadu. Every burger is made with love, care, and fire.',
  },
  {
    Icon: Flame,
    title: 'Better Than KFC',
    desc: '"Way better than any burger in town — especially better than KFC!" Bigger portions, real chicken, actually hot food, and better popcorn chicken.',
  },
  {
    Icon: Coins,
    title: 'Unbeatable Value',
    desc: 'Premium quality burgers from ₹1 to ₹200. No compromise on taste, no burning a hole in your pocket. That\'s the BAMA\'S promise.',
  },
  {
    Icon: Crown,
    title: 'The Kovilpatti Crown',
    desc: 'Korean Hot & Sweet Crispy Chicken Burger — the dish that put BAMA\'S on the map and keeps customers coming back every day.',
  },
]

export default function StorySection() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const lineRef = useRef()
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="story" className="section-pad relative overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,122,0,0.035) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.4em] uppercase mb-4"
            style={{ color: '#FF7A00' }}
          >
            Our Story
          </motion.p>
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="leading-none text-white"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '0.06em',
            }}
          >
            NOT JUST A{' '}
            <span className="gradient-text-fire">BURGER</span>
            <br />
            IT'S AN{' '}
            <span className="gradient-text-orange" style={{
              background: 'linear-gradient(135deg, #FF7A00, #F4B942)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              EXPERIENCE
            </span>
          </motion.h2>
          <div
            ref={lineRef}
            className="mt-8 h-px"
            style={{
              background: 'linear-gradient(to right, #FF7A00, #F4B942, transparent)',
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
          {stats.map(({ value, label, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 text-center group hover:glass-orange transition-all duration-400"
            >
              {/* Star rating gets star icons */}
              {label === 'Star Rating' ? (
                <div className="flex justify-center mb-1">
                  <StarRow rating={4.7} size={18} />
                </div>
              ) : null}
              <p
                className="gradient-text-fire group-hover:scale-110 transition-transform duration-300 inline-block"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(2.2rem,5vw,3.5rem)',
                  background: 'linear-gradient(135deg, #FF4500, #FF7A00, #F4B942)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {value}{suffix}
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase mt-2"
                style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(255,122,0,0.4), rgba(244,185,66,0.2), transparent)' }}
          />

          <div className="space-y-16">
            {timelineItems.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full z-10"
                  style={{ background: '#FF7A00', boxShadow: '0 0 14px rgba(255,122,0,0.6)' }}
                />

                {/* Left column */}
                <div className={`ml-16 md:ml-0 ${i % 2 === 0 ? '' : 'hidden md:block md:invisible'}`}>
                  {i % 2 === 0 && (
                    <div className="glass rounded-2xl p-8 hover:glass-orange transition-all duration-500 group md:mr-4">
                      {/* Lucide icon — no emoji */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 contact-icon"
                        style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.18)' }}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.75}
                          style={{ color: '#FF7A00' }}
                        />
                      </div>
                      <h3
                        className="text-white font-bold mb-3 group-hover:text-orange transition-colors duration-300"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', letterSpacing: '0.01em' }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {desc}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right column */}
                <div className={`ml-16 md:ml-0 ${i % 2 === 1 ? '' : 'hidden md:block md:invisible'}`}>
                  {i % 2 === 1 && (
                    <div className="glass rounded-2xl p-8 hover:glass-orange transition-all duration-500 group md:ml-4">
                      {/* Lucide icon — no emoji */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 contact-icon"
                        style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.18)' }}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.75}
                          style={{ color: '#FF7A00' }}
                        />
                      </div>
                      <h3
                        className="text-white font-bold mb-3 group-hover:text-orange transition-colors duration-300"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', letterSpacing: '0.01em' }}
                      >
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                        {desc}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Address block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 glass-orange rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-2" style={{ color: '#FF7A00' }}>Find Us</p>
            <h3 className="text-white text-2xl font-bold mb-1">10, Ettayapuram Road</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Kovilpatti, Tamil Nadu</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#66D17A' }} />
              <p className="text-white text-sm font-medium">Open Now · Until 10:30 PM</p>
            </div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Dine-in available</p>
          </div>
          <a
            href="tel:+917708704534"
            className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #FF7A00, #FF4500)',
              boxShadow: '0 0 25px rgba(255,122,0,0.35)',
            }}
          >
            <Phone size={16} strokeWidth={1.75} />
            077087 04534
          </a>
        </motion.div>
      </div>
    </section>
  )
}
