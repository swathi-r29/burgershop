import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2, ShoppingBag, Phone } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function CartDrawer() {
  const isCartOpen = useStore((s) => s.isCartOpen)
  const toggleCart = useStore((s) => s.toggleCart)
  const cart = useStore((s) => s.cart)
  const removeFromCart = useStore((s) => s.removeFromCart)
  const updateQty = useStore((s) => s.updateQty)
  const cartTotal = useStore((s) => s.cartTotal())
  const clearCart = useStore((s) => s.clearCart)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-[9980] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[9981] w-full max-w-md flex flex-col"
            style={{ background: '#0A0A0A', borderLeft: '1px solid rgba(255,107,0,0.15)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-orange" />
                <h2 className="text-white font-semibold text-lg">Your Order</h2>
                <span className="bg-orange text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {cart.length}
                </span>
              </div>
              <button onClick={toggleCart} className="p-2 text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto admin-scroll p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2"
                    style={{ background: 'rgba(255,122,0,0.08)', border: '1px solid rgba(255,122,0,0.15)' }}
                  >
                    <ShoppingBag size={28} strokeWidth={1.5} style={{ color: 'rgba(255,122,0,0.6)' }} />
                  </div>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Your cart is empty</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>Add some delicious items</p>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 rounded-xl glass"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-orange text-sm font-bold mt-1">₹{item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQty(item._id, item.qty - 1)}
                            className="w-6 h-6 rounded-full glass-orange flex items-center justify-center text-orange text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="text-white text-sm font-semibold w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item._id, item.qty + 1)}
                            className="w-6 h-6 rounded-full glass-orange flex items-center justify-center text-orange text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-white/20 hover:text-red transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                        <p className="text-white/60 text-xs font-medium">
                          ₹{item.price * item.qty}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Total</span>
                  <span className="text-white font-bold text-xl">₹{cartTotal}</span>
                </div>

                <a
                  href={`tel:+917708704534`}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-full font-semibold text-white text-sm tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #FF7A00, #FF4500)',
                    boxShadow: '0 0 25px rgba(255,122,0,0.3)',
                  }}
                >
                  <Phone size={16} />
                  Call to Order · 077087 04534
                </a>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
