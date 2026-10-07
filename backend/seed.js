require('dotenv').config()
const mongoose = require('mongoose')
const MenuItem = require('./models/MenuItem')

const SEED_DATA = require('./config/seedData')

const seed = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bamasburgerbox'
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  await MenuItem.deleteMany({})
  console.log('Cleared existing menu items')

  const created = await MenuItem.insertMany(SEED_DATA)
  console.log(`Seeded ${created.length} menu items`)

  await mongoose.disconnect()
  console.log('Done!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
