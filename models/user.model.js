import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const ROLE_USER = 'USER';
export const ROLE_ADMIN = 'ADMIN';

export const ALLOWED_ROLES = [ROLE_USER, ROLE_ADMIN];

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
      type: String,
      enum: ALLOWED_ROLES,
      default: 'user',
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
