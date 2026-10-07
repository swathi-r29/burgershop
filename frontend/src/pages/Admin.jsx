import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, BarChart3,
  LogOut, ChevronRight, Menu as MenuIcon, X
} from 'lucide-react'
import { useStore } from '../store/useStore'
import AdminOverview from '../components/admin/AdminOverview'
import AdminMenuManager from '../components/admin/AdminMenuManager'
import AdminOrders from '../components/admin/AdminOrders'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: UtensilsCrossed, label: 'Menu', path: '/admin/menu' },
  { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
]

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdminAuth, clearAdmin } = useStore()

  useEffect(() => {
    if (!isAdminAuth) {
      navigate('/admin/login')
    }
  }, [isAdminAuth, navigate])

  const handleLogout = () => {
    clearAdmin()
    navigate('/admin/login')
  }

  if (!isAdminAuth) return null

  return (
    <div className="min-h-screen flex" style={{ background: '#080808' }}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 admin-sidebar flex-col transition-transform duration-300 ${
          sidebarOpen ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,107,0,0.1)' }}>
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF2D20)' }}
            >
              <span className="text-white text-xs font-bold">BB</span>
            </div>
            <div>
              <p className="text-white text-sm font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                BAMA'S
              </p>
              <p className="text-orange text-[9px] tracking-widest uppercase">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path))
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
                style={
                  active
                    ? {
                        background: 'rgba(255,107,0,0.15)',
                        border: '1px solid rgba(255,107,0,0.2)',
                        color: '#FF6B00',
                      }
                    : {}
                }
              >
                <Icon size={16} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,107,0,0.1)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-red hover:bg-red/10 w-full transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 rounded-xl glass-orange text-orange"
      >
        {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <div
          className="sticky top-0 z-40 px-6 py-4 border-b"
          style={{
            background: 'rgba(8,8,8,0.95)',
            borderColor: 'rgba(255,107,0,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-white font-semibold text-base">
              {navItems.find(
                (n) => location.pathname === n.path || (n.path !== '/admin' && location.pathname.startsWith(n.path))
              )?.label ?? 'Dashboard'}
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/40 text-xs">Live</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 admin-scroll overflow-y-auto">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/menu" element={<AdminMenuManager />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/analytics" element={<AdminOverview />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
