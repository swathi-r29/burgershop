const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        name: String,
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    customerName: { type: String, default: 'Walk-in Customer' },
    phone: { type: String, default: '' },
    orderType: {
      type: String,
      enum: ['Dine In', 'Takeaway'],
      default: 'Dine In',
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
