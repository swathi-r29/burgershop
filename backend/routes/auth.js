const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// POST admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD || 'bamasburgerbox2024'

  if (username !== adminUsername) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Compare password
  let passwordMatch = password === adminPassword
  // If hashed password is stored
  if (adminPassword.startsWith('$2')) {
    passwordMatch = await bcrypt.compare(password, adminPassword)
  }

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET || 'bamasburgerbox_secret_2024',
    { expiresIn: '7d' }
  )

  res.json({ success: true, token, admin: { username, role: 'admin' } })
})

// POST verify token
router.post('/verify', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false })
  }
  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bamasburgerbox_secret_2024')
    res.json({ valid: true, admin: decoded })
  } catch {
    res.status(401).json({ valid: false })
  }
})

module.exports = router
