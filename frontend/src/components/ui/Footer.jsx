import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ borderColor: 'rgba(255,122,0,0.08)', background: '#080808' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3
              className="text-3xl gradient-text-fire mb-3"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              BAMA'S BURGER BOX
            </h3>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              Women-owned burger restaurant crafting the finest burgers in Kovilpatti, Tamil Nadu.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#66D17A' }} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Open Now · Closes 10:30 PM</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Quick Links</p>
            <div className="space-y-3">
              {[
                { label: 'Menu', to: '/menu' },
                { label: 'Our Story', to: '/#story' },
                { label: 'Reviews', to: '/#reviews' },
                { label: 'Admin', to: '/admin/login' },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="block text-white/40 text-sm hover:text-orange transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Contact</p>
            <div className="space-y-3">
              <a href="tel:+917708704534" className="flex items-center gap-2.5 text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FF7A00'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                <Phone size={13} strokeWidth={1.75} style={{ color: '#FF7A00', flexShrink: 0 }} />
                077087 04534
              </a>
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                <MapPin size={13} strokeWidth={1.75} style={{ color: '#FF7A00', marginTop: '2px', flexShrink: 0 }} />
                <span>10, Ettayapuram Rd<br />Kovilpatti, TN 641005</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                <Clock size={13} strokeWidth={1.75} style={{ color: '#FF7A00', flexShrink: 0 }} />
                Open until 10:30 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
        >
          <p className="text-white/20 text-xs">
            © {year} Bama's Burger Box. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,122,0,0.12)', border: '1px solid rgba(255,122,0,0.2)' }}>
              <span style={{ fontSize: '8px', color: '#FF7A00', fontWeight: 700 }}>W</span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>Proudly women-owned &amp; operated</p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,122,0,0.25), transparent)' }}
      />
    </footer>
  )
}
