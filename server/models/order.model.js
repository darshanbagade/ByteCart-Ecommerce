import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true }
}, { _id: false });

const paymentInfoSchema = new mongoose.Schema({
  status: { type: String }, // success, failed, pending
  transactionId: { type: String }, // from Stripe/Razorpay
  method: { type: String }, // card or upi
  paidAt: { type: Date }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [orderItemSchema],
  shippingAddress: shippingAddressSchema,
  paymentMethod: {
    type: String,
    enum: ["cod", "card", "upi"],
    required: true
  },
  paymentInfo: paymentInfoSchema,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled"],
    default: "processing"
  },
  totalAmount: {
    type: Number,
    required: true,
    default : 0
  }
}, {
  timestamps: true
});

export const Order = mongoose.model("Order", orderSchema);
