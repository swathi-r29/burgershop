const express = require('express')
const router = express.Router()
const multer = require('multer')
const { protect } = require('../middleware/auth')

// Use memory storage (compatible without Cloudinary setup)
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files allowed'), false)
    }
  },
})

router.post('/', protect, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image provided' })

  // If Cloudinary is configured, upload there
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    try {
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'bamasburgerbox', quality: 'auto', fetch_format: 'auto' },
          (err, result) => (err ? reject(err) : resolve(result))
        )
        uploadStream.end(req.file.buffer)
      })

      return res.json({ success: true, url: result.secure_url, publicId: result.public_id })
    } catch (err) {
      return res.status(500).json({ message: 'Cloudinary upload failed', error: err.message })
    }
  }

  // Fallback: return base64 data URL (for development)
  const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
  res.json({ success: true, url: base64, note: 'Development mode: Configure Cloudinary for production' })
})

module.exports = router
