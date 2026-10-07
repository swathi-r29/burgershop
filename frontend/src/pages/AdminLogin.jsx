import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { authAPI } from '../utils/api'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const setAdminAuth = useStore((s) => s.setAdminAuth)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authAPI.login(form)
      setAdminAuth(res.data.token)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#050505' }}
    >
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,107,0,0.04) 0%, transparent 60%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="inline-flex w-16 h-16 rounded-full items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #FF2D20)', boxShadow: '0 0 30px rgba(255,107,0,0.4)' }}
          >
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-3xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            ADMIN ACCESS
          </h1>
          <p className="text-white/30 text-xs tracking-widest mt-1">BAMA'S BURGER BOX · DASHBOARD</p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(20,20,20,0.8)',
            border: '1px solid rgba(255,107,0,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="admin"
                className="w-full px-5 py-4 rounded-xl text-white text-sm placeholder-white/20 outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                required
              />
            </div>

            <div>
              <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-xl text-white text-sm placeholder-white/20 outline-none pr-12 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-white font-semibold text-sm tracking-widest uppercase mt-2 disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #FF2D20)',
                boxShadow: '0 0 25px rgba(255,107,0,0.3)',
              }}
            >
              {loading ? 'Signing in...' : 'Access Dashboard'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
