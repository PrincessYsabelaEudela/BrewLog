import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      tryp: String,
      requred: true,
      unique: true,
    },

    email: {
      tryp: String,
      requred: true,
      unique: true,
    },

    password: {
      tryp: String,
      requred: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
