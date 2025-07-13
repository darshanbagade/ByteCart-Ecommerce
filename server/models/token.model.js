import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date, // ✅ Correct
    required: true
  },
  isRevoked: {
    type: Boolean,
    default: false,
    required: true
  }
}, { timestamps: true });

export const Token = mongoose.model('Token', tokenSchema);
