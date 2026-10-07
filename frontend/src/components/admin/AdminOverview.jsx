import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ShoppingBag, Star, DollarSign, Users, Clock, Award, Globe, Plus } from 'lucide-react'
import { analyticsAPI, orderAPI } from '../../utils/api'

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl p-6 relative overflow-hidden group"
    style={{
      background: 'rgba(20,20,20,0.8)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    <div
      className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-30"
      style={{ background: `radial-gradient(ellipse, ${color}40, transparent)` }}
    />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{label}</p>
        <p className="text-white text-3xl font-black" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{value}</p>
        {sub && <p className="text-white/30 text-xs mt-1">{sub}</p>}
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}20` }}
      >
        <Icon size={20} style={{ color }} />
      </div>
    </div>
  </motion.div>
)

const MOCK_STATS = {
  totalRevenue: 24850,
  totalOrders: 142,
  avgRating: 4.7,
  todayOrders: 18,
  popularItem: 'Korean Hot & Sweet Crispy Chicken Burger',
  openSince: 'Kovilpatti, Tamil Nadu',
}

export default function AdminOverview() {
  const [stats, setStats] = useState(MOCK_STATS)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, ordersRes] = await Promise.all([
          analyticsAPI.getSummary(),
          orderAPI.getAll(),
        ])
        if (analyticsRes.data) setStats(analyticsRes.data)
        if (ordersRes.data?.data) setRecentOrders(ordersRes.data.data.slice(0, 5))
      } catch {
        // Use mock data
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { icon: DollarSign, label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString()}`, sub: 'All time', color: '#FF6B00' },
    { icon: ShoppingBag, label: 'Total Orders', value: stats.totalOrders, sub: `${stats.todayOrders} today`, color: '#FFD700' },
    { icon: Star, label: 'Avg Rating', value: stats.avgRating, sub: '31 reviews', color: '#FF2D20' },
    { icon: Users, label: 'Happy Customers', value: '200+', sub: 'Estimated', color: '#4ade80' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Popular Item Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,45,32,0.05))',
          border: '1px solid rgba(255,107,0,0.2)',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,122,0,0.1)', border: '1px solid rgba(255,122,0,0.2)' }}
          >
            <Award size={20} strokeWidth={1.75} style={{ color: '#FF7A00' }} />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: '#FF7A00' }}>Most Popular Item</p>
            <p className="text-white font-bold text-lg">{stats.popularItem}</p>
            <p className="text-white/40 text-xs mt-1">Your signature dish — keeps customers coming back!</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <h3 className="text-white font-semibold text-sm flex items-center gap-2">
            <Clock size={14} className="text-orange" />
            Recent Orders
          </h3>
        </div>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-white/30 text-sm">No orders yet. They'll appear here!</p>
            </div>
          ) : (
            recentOrders.map((order) => (
              <div key={order._id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{order.customerName || 'Customer'}</p>
                  <p className="text-white/40 text-xs">{order.items?.length} items · {order.orderType}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-orange font-bold text-sm">₹{order.totalAmount}</span>
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: order.status === 'ready' ? 'rgba(74,222,128,0.15)' :
                        order.status === 'preparing' ? 'rgba(255,215,0,0.15)' : 'rgba(255,107,0,0.15)',
                      color: order.status === 'ready' ? '#4ade80' :
                        order.status === 'preparing' ? '#FFD700' : '#FF6B00',
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
        { label: 'Add Menu Item', desc: 'Add a new dish to your menu', link: '/admin/menu', Icon: Plus },
          { label: 'View Orders', desc: 'Manage incoming orders', link: '/admin/orders', Icon: ShoppingBag },
          { label: 'View Website', desc: 'See how customers see you', link: '/', Icon: Globe },
        ].map(({ label, desc, link, Icon }, i) => (
          <motion.a
            key={label}
            href={link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex items-center gap-4 p-5 rounded-2xl glass hover:glass-orange transition-all duration-300 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,122,0,0.08)', border: '1px solid rgba(255,122,0,0.12)' }}
            >
              <Icon size={18} strokeWidth={1.75} style={{ color: '#FF7A00' }} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold group-hover:text-orange transition-colors">{label}</p>
              <p className="text-white/30 text-xs">{desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
