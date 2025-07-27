// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Type definition with additional security considerations
export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Never return password in queries
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
    const obj = ret as any;  // Type assertion
    delete obj.password;
    delete obj.__v;
    return obj;
  }
  },
  toObject: { virtuals: true }
});

// Password hashing middleware
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Password comparison method
UserSchema.methods.comparePassword = async function(
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexes for better query performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

// Virtual for profile URL (example)
UserSchema.virtual('profileUrl').get(function() {
  return `/users/${this._id}`;
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;