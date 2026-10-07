const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { protect } = require('../middleware/auth')

// POST create order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save()
    res.status(201).json({ success: true, data: order })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// GET all orders (admin)
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const orders = await Order.find(filter).sort({ createdAt: -1 }).limit(100)
    res.json({ success: true, count: orders.length, data: orders })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ success: true, data: order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PATCH update order status (admin)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json({ success: true, data: order })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
