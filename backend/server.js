const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

const menuRoutes = require('./routes/menu')
const orderRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const uploadRoutes = require('./routes/upload')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet({ crossOriginEmbedderPolicy: false }))
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: "BAMA'S BURGER BOX API is running", timestamp: new Date() })
})

// Routes
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/upload', uploadRoutes)

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

// Connect DB + Start Server
const connectDB = require('./config/db')
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n[BAMA'S BURGER BOX API]`)
    console.log(`Server running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}\n`)
  })
})
