const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItem')
const { protect } = require('../middleware/auth')

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const { category, featured, available } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (featured) filter.featured = featured === 'true'
    if (available !== undefined) filter.available = available === 'true'

    const items = await MenuItem.find(filter).sort({ sortOrder: 1, createdAt: -1 })
    res.json({ success: true, count: items.length, data: items })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json({ success: true, data: item })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST create menu item (admin)
router.post('/', protect, async (req, res) => {
  try {
    const item = new MenuItem(req.body)
    await item.save()
    res.status(201).json({ success: true, data: item })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT update menu item (admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json({ success: true, data: item })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PATCH toggle availability (admin)
router.patch('/:id/availability', protect, async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    item.available = !item.available
    await item.save()
    res.json({ success: true, data: item })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE menu item (admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id)
    if (!item) return res.status(404).json({ message: 'Item not found' })
    res.json({ success: true, message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
