import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { orderAPI } from '../../utils/api'
import toast from 'react-hot-toast'
import { Phone, ClipboardList } from 'lucide-react'

const STATUS_OPTIONS = ['pending', 'preparing', 'ready', 'delivered']

const STATUS_STYLES = {
  pending: { bg: 'rgba(255,107,0,0.15)', color: '#FF6B00' },
  preparing: { bg: 'rgba(255,215,0,0.15)', color: '#FFD700' },
  ready: { bg: 'rgba(74,222,128,0.15)', color: '#4ade80' },
  delivered: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' },
}

const MOCK_ORDERS = [
  {
    _id: 'ord1',
    customerName: 'Arjun Kumar',
    phone: '9876543210',
    orderType: 'Dine In',
    items: [{ name: 'Korean Hot Chicken Burger', qty: 2, price: 180 }, { name: 'Crispy Fries', qty: 1, price: 60 }],
    totalAmount: 420,
    status: 'preparing',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'ord2',
    customerName: 'Priya Selvi',
    phone: '9123456789',
    orderType: 'Takeaway',
    items: [{ name: 'Classic Smash Burger', qty: 1, price: 150 }, { name: 'Soft Drink', qty: 2, price: 40 }],
    totalAmount: 230,
    status: 'pending',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    _id: 'ord3',
    customerName: 'Senthil R.',
    phone: '8765432109',
    orderType: 'Dine In',
    items: [{ name: 'Popcorn Chicken', qty: 2, price: 80 }],
    totalAmount: 160,
    status: 'ready',
    createdAt: new Date(Date.now() - 900000).toISOString(),
  },
]

function OrderCard({ order, onStatusChange }) {
  const [updating, setUpdating] = useState(false)
  const style = STATUS_STYLES[order.status] || STATUS_STYLES.pending

  const handleStatusChange = async (newStatus) => {
    setUpdating(true)
    try {
      await orderAPI.updateStatus(order._id, newStatus)
      toast.success(`Order marked as ${newStatus}!`)
      onStatusChange(order._id, newStatus)
    } catch {
      toast.error('Could not update status.')
      onStatusChange(order._id, newStatus) // optimistic
    } finally {
      setUpdating(false)
    }
  }

  const time = new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 relative"
      style={{ background: 'rgba(20,20,20,0.8)', border: `1px solid ${style.color}30` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-sm">{order.customerName}</p>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: style.bg, color: style.color }}
            >
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <Phone size={11} className="text-orange" />
              {order.phone}
            </span>
            <p className="text-white/40 text-xs">· {order.orderType}</p>
            <p className="text-white/30 text-xs">· {time}</p>
          </div>
        </div>
        <p className="text-orange font-black text-lg" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          ₹{order.totalAmount}
        </p>
      </div>

      {/* Items */}
      <div className="space-y-1.5 mb-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-xs">
            <span className="text-white/60">{item.qty}× {item.name}</span>
            <span className="text-white/40">₹{item.price * item.qty}</span>
          </div>
        ))}
      </div>

      {/* Status Change */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleStatusChange(s)}
            disabled={order.status === s || updating}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${
              order.status === s ? 'opacity-100' : 'opacity-30 hover:opacity-70'
            }`}
            style={{
              background: STATUS_STYLES[s].bg,
              color: STATUS_STYLES[s].color,
              border: order.status === s ? `1px solid ${STATUS_STYLES[s].color}60` : '1px solid transparent',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await orderAPI.getAll()
      setOrders(res.data.data || res.data || MOCK_ORDERS)
    } catch {
      setOrders(MOCK_ORDERS)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status: newStatus } : o))
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
  }

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'pending', label: 'Pending' },
          { key: 'preparing', label: 'Preparing' },
          { key: 'ready', label: 'Ready' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              filter === key ? 'text-white' : 'text-white/40 glass hover:text-white/70'
            }`}
            style={
              filter === key
                ? { background: 'linear-gradient(135deg, #FF6B00, #FF2D20)' }
                : {}
            }
          >
            {label}
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                filter === key ? 'bg-white/20' : 'bg-white/10'
              }`}
            >
              {counts[key] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Orders grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl animate-pulse" style={{ background: 'rgba(20,20,20,0.5)' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
          <ClipboardList size={40} className="text-white/20" />
          <p className="text-white/30 text-sm">No {filter === 'all' ? '' : filter} orders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filtered.map((order) => (
              <OrderCard key={order._id} order={order} onStatusChange={handleStatusChange} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
