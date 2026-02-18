import mongoose from 'mongoose';

const withdrawalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  transactionId: String,
  adminNotes: String,
  processedAt: Date
}, { timestamps: true });

export default mongoose.model('Withdrawal', withdrawalSchema);
