import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'
import { StarRow } from '../ui/StarIcon'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef()
  const videoRef = useRef()
  const burgerTextRef = useRef()
  const badgeRef = useRef()

  useEffect(() => {
    // 1. Play the video automatically
    const video = videoRef.current
    if (video) {
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      video.loop = true
      video.play().catch(err => console.log('Autoplay blocked:', err))
    }

    // 2. Entrance Animation for the Hero content
    const tl = gsap.timeline()
    gsap.set(burgerTextRef.current, { opacity: 0, y: 30 })
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.8 })
    
    tl.to(burgerTextRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(badgeRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.8')

    // 3. Simple scroll fade out (not scrubbing the video, just fading out the text for premium feel)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (burgerTextRef.current) {
          gsap.set(burgerTextRef.current, { opacity: 1 - self.progress, y: self.progress * -50 })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} id="hero-section" className="relative w-full h-[100vh] bg-[#0A0A0A] hero-section overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0A0A]">
        <video 
          ref={videoRef}
          src="/assets/burger/BAMA'S_BURGER_BOX_animation_1080p_202606240024.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-[0.9] translate-y-[-8%] lg:translate-y-0 lg:scale-[0.75] lg:translate-x-[20%]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)',
            maskImage: 'radial-gradient(ellipse, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 60%)'
          }}
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
        />
        {/* Subtle vignette for left text readability */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* ─── BURGER HERO UI OVERLAYS ─── */}
      <div 
        ref={burgerTextRef} 
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center lg:items-start justify-center z-20 pointer-events-none px-6 lg:pl-16 text-center lg:text-left opacity-0"
      >
        {/* Women-owned badge */}
        <div
          ref={badgeRef}
          className="flex items-center gap-2 mb-6 px-5 py-2 rounded-full pointer-events-auto opacity-0"
          style={{
            background: 'rgba(255,122,0,0.06)',
            border: '1px solid rgba(255,122,0,0.22)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-muted-green animate-pulse" style={{ background: '#66D17A' }} />
          <span className="text-white/60 text-[11px] tracking-[0.3em] uppercase font-medium">
            Women-Owned · Kovilpatti, Tamil Nadu
          </span>
        </div>

        {/* Main headline */}
        <div className="text-center lg:text-left overflow-hidden">
          <h1
            className="gradient-text-fire leading-none tracking-tight"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(4.5rem,13vw,12rem)',
              letterSpacing: '0.04em',
            }}
          >
            BAMA'S
          </h1>
          <h1
            className="text-white leading-none tracking-widest"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(2.2rem,7.5vw,6.5rem)',
              letterSpacing: '0.18em',
            }}
          >
            BURGER BOX
          </h1>
        </div>

        {/* Tagline */}
        <p
          className="mt-5 text-center lg:text-left tracking-[0.28em] uppercase"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(0.7rem,1.4vw,0.9rem)',
            color: '#D0D0D0',
            fontStyle: 'italic',
            letterSpacing: '0.28em',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          Crafted Fresh. Served Hot. Made for Burger Lovers.
        </p>

        {/* Rating */}
        <div className="flex items-center gap-3 mt-6">
          <StarRow rating={4.7} size={14} />
          <span className="text-gold font-semibold text-sm" style={{ color: '#F4B942' }}>4.7</span>
          <span className="text-white/30 text-sm">· 31 reviews</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-9 pointer-events-auto">
          <Link
            to="/menu"
            className="magnetic-btn group relative px-10 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FF7A00, #FF4500)',
              boxShadow: '0 0 35px rgba(255,122,0,0.35)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Menu <ArrowRight size={11} />
            </span>
            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
          </Link>

          <a
            href="tel:+917708704534"
            className="magnetic-btn flex items-center gap-2.5 px-10 py-4 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-300"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            <Phone size={14} strokeWidth={1.75} style={{ color: '#FF7A00' }} />
            Order Now
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-white/25 text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(255,122,0,0.5), transparent)' }} />
      </div>
      
    </div>
  )
}
