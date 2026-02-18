import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
