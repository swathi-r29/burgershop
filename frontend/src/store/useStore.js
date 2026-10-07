import { create } from 'zustand'

export const useStore = create((set, get) => ({
  // Loading state
  isLoading: true,
  setLoading: (val) => set({ isLoading: val }),

  // Menu
  menuItems: [],
  categories: ['All', 'Burgers', 'Sandwiches', 'Sides', 'Drinks'],
  activeCategory: 'All',
  setMenuItems: (items) => set({ menuItems: items }),
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  // Cart
  cart: [],
  addToCart: (item) => {
    const cart = get().cart
    const existing = cart.find(c => c._id === item._id)
    if (existing) {
      set({ cart: cart.map(c => c._id === item._id ? { ...c, qty: c.qty + 1 } : c) })
    } else {
      set({ cart: [...cart, { ...item, qty: 1 }] })
    }
  },
  removeFromCart: (id) => set({ cart: get().cart.filter(c => c._id !== id) }),
  updateQty: (id, qty) => {
    if (qty === 0) {
      set({ cart: get().cart.filter(c => c._id !== id) })
    } else {
      set({ cart: get().cart.map(c => c._id === id ? { ...c, qty } : c) })
    }
  },
  clearCart: () => set({ cart: [] }),
  cartTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.qty, 0),
  cartCount: () => get().cart.reduce((sum, item) => sum + item.qty, 0),

  // Admin
  isAdminAuth: false,
  adminToken: null,
  setAdminAuth: (token) => set({ isAdminAuth: true, adminToken: token }),
  clearAdmin: () => set({ isAdminAuth: false, adminToken: null }),

  // UI
  isCartOpen: false,
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  activeMenuItem: null,
  setActiveMenuItem: (item) => set({ activeMenuItem: item }),
}))
