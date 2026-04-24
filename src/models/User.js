import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['seeker', 'employer', 'admin'], default: 'seeker' },
    headline: { type: String, default: '' },
    location: { type: String, default: '' },
    skills: { type: [String], default: [] },
    avatarUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

// Hide sensitive fields on JSON serialization
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

// Helper: create a user with a raw password
userSchema.statics.createWithPassword = async function ({ email, password, name, role }) {
  const passwordHash = await bcrypt.hash(password, 12);
  return this.create({ email, passwordHash, name, role });
};

// Helper: check a raw password against the hash
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.model('User', userSchema);
