const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const MenuItem = require('../models/MenuItem')
const SEED_DATA = require('./seedData')

const connectDB = async () => {
  let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bamasburgerbox'
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    })
    console.log(`✅ MongoDB Connected to external URI`)
  } catch (error) {
    console.log(`ℹ️ External MongoDB not available (${error.message}). Starting in-memory MongoDB...`)
    const mongod = await MongoMemoryServer.create()
    uri = mongod.getUri()
    await mongoose.connect(uri)
    console.log(`✅ In-Memory MongoDB Connected at ${uri}`)
  }

  // Auto-seed if empty
  try {
    const count = await MenuItem.countDocuments()
    if (count === 0) {
      console.log('🌱 Seeding initial menu items...')
      await MenuItem.insertMany(SEED_DATA)
      console.log(`✅ Auto-seeded ${SEED_DATA.length} menu items`)
    }
  } catch (err) {
    console.error('Error during auto-seed:', err.message)
  }
}

module.exports = connectDB

