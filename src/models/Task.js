import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  payoutAmount: { type: Number, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  maxSubmissions: { type: Number, default: 1 },
  deadline: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
