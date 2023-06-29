import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { ALLOWED_ROLES, ROLE_USER } from '../config/role.js';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    role: {
      type: Number,
      enum: ALLOWED_ROLES,
      default: ROLE_USER,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'role', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

export const User = mongoose.model('User', userSchema);
