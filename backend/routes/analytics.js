const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const MenuItem = require('../models/MenuItem')
const { protect } = require('../middleware/auth')

router.get('/summary', protect, async (req, res) => {
  try {
    const [orders, menuItems] = await Promise.all([
      Order.find(),
      MenuItem.find(),
    ])

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
    const totalOrders = orders.length
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayOrders = orders.filter((o) => new Date(o.createdAt) >= today).length

    // Most ordered item
    const itemCounts = {}
    orders.forEach((order) => {
      order.items.forEach((item) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.qty || 1)
      })
    })
    const popularItem = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
      || 'Korean Hot & Sweet Crispy Chicken Burger'

    res.json({
      success: true,
      totalRevenue,
      totalOrders,
      todayOrders,
      totalMenuItems: menuItems.length,
      avgRating: 4.7,
      popularItem,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
