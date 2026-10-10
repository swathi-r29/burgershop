const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

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
}

module.exports = connectDB

