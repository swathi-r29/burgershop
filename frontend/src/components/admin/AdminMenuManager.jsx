import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Upload } from 'lucide-react'
import { menuAPI, uploadAPI } from '../../utils/api'
import { FALLBACK_MENU } from '../sections/MenuSection'
import toast from 'react-hot-toast'

const CATEGORIES = ['Burgers', 'Sandwiches', 'Sides', 'Drinks']

const EMPTY_FORM = {
  name: '',
  category: 'Burgers',
  price: '',
  description: '',
  image: '',
  available: true,
  featured: false,
  nutritionInfo: { cal: '', protein: '', carbs: '', fat: '' },
}

function ItemForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_FORM)
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      const res = await uploadAPI.upload(fd)
      setForm({ ...form, image: res.data.url })
      toast.success('Image uploaded!')
    } catch {
      toast.error('Upload failed. Using URL instead.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl p-6 mb-6"
      style={{ background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,107,0,0.2)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold">
          {initial ? 'Edit Item' : 'Add New Item'}
        </h3>
        <button onClick={onCancel} className="text-white/40 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Item Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Korean Hot & Sweet Crispy Chicken Burger"
            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Category & Price */}
        <div>
          <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Price (₹) *</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="150"
            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            placeholder="Describe this delicious item..."
            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 outline-none resize-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Image</label>
          <div className="flex gap-3">
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Paste image URL or upload below"
              className="flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-white/20 outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
            <label className="flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer text-orange text-sm font-medium hover:bg-orange/10 transition-colors border border-orange/30">
              <Upload size={14} />
              {uploading ? 'Uploading...' : 'Upload'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          {form.image && (
            <img src={form.image} alt="preview" className="mt-2 h-20 rounded-lg object-cover" />
          )}
        </div>

        {/* Nutrition */}
        <div className="md:col-span-2">
          <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Nutrition Info</label>
          <div className="grid grid-cols-4 gap-3">
            {['cal', 'protein', 'carbs', 'fat'].map((key) => (
              <div key={key}>
                <p className="text-white/20 text-[10px] uppercase mb-1">{key}</p>
                <input
                  type="number"
                  value={form.nutritionInfo[key]}
                  onChange={(e) => setForm({ ...form, nutritionInfo: { ...form.nutritionInfo, [key]: e.target.value } })}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg text-white text-sm placeholder-white/20 outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          {[
            { key: 'available', label: 'Available' },
            { key: 'featured', label: 'Featured' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setForm({ ...form, [key]: !form[key] })}
                className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${form[key] ? 'bg-orange' : 'bg-white/10'}`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form[key] ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
              </div>
              <span className="text-white/60 text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #FF6B00, #FF2D20)' }}
        >
          <Save size={14} />
          {initial ? 'Save Changes' : 'Add Item'}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 rounded-xl text-white/40 text-sm glass hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  )
}

export default function AdminMenuManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await menuAPI.getAll()
      setItems(res.data.data || res.data)
    } catch {
      setItems(FALLBACK_MENU)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (form) => {
    try {
      if (editItem) {
        await menuAPI.update(editItem._id, form)
        toast.success('Item updated!')
      } else {
        await menuAPI.create(form)
        toast.success('Item added!')
      }
      setShowForm(false)
      setEditItem(null)
      fetchItems()
    } catch {
      toast.error('Failed to save. Check your connection.')
      if (editItem) {
        setItems((prev) => prev.map((i) => (i._id === editItem._id ? { ...i, ...form } : i)))
      } else {
        setItems((prev) => [...prev, { ...form, _id: Date.now().toString() }])
      }
      setShowForm(false)
      setEditItem(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    try {
      await menuAPI.delete(id)
      toast.success('Item deleted!')
    } catch {
      toast.error('Could not delete from server.')
    }
    setItems((prev) => prev.filter((i) => i._id !== id))
  }

  const handleToggle = async (id) => {
    try {
      await menuAPI.toggleAvailability(id)
    } catch {}
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, available: !i.available } : i)))
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-semibold text-lg">{items.length} Menu Items</h2>
          <p className="text-white/30 text-xs mt-0.5">Manage your full menu catalog</p>
        </div>
        <button
          onClick={() => { setEditItem(null); setShowForm(true) }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #FF6B00, #FF2D20)', boxShadow: '0 0 20px rgba(255,107,0,0.3)' }}
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {(showForm || editItem) && (
          <ItemForm
            initial={editItem}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditItem(null) }}
          />
        )}
      </AnimatePresence>

      {/* Items Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          {loading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="p-4 flex gap-4 animate-pulse">
                  <div className="w-16 h-16 rounded-lg bg-white/5" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                    <div className="h-3 bg-white/5 rounded w-1/4" />
                  </div>
                </div>
              ))
            : items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  className="p-4 flex items-center gap-4 hover:bg-white/2 transition-colors"
                >
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      {item.featured && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] text-orange bg-orange/10 uppercase tracking-wider flex-shrink-0">Featured</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-white/40 text-xs">{item.category}</span>
                      <span className="text-orange font-bold text-sm">₹{item.price}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleToggle(item._id)}
                      className={`p-2 rounded-lg transition-colors ${item.available ? 'text-green-400 hover:bg-green-400/10' : 'text-white/20 hover:bg-white/5'}`}
                      title={item.available ? 'Available' : 'Unavailable'}
                    >
                      {item.available ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>
                    <button
                      onClick={() => { setEditItem(item); setShowForm(false) }}
                      className="p-2 rounded-lg text-white/40 hover:text-orange hover:bg-orange/10 transition-colors"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-lg text-white/20 hover:text-red hover:bg-red/10 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  )
}
