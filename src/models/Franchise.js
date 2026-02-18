import mongoose from 'mongoose';

const franchiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  registrationNumber: String,
  isApproved: { type: Boolean, default: false },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });

export default mongoose.model('Franchise', franchiseSchema);
