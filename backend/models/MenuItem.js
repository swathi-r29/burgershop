const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Burgers', 'Sandwiches', 'Sides', 'Drinks'],
    },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    ingredients: [{ type: String }],
    nutritionInfo: {
      cal: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
    },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('MenuItem', menuItemSchema)
