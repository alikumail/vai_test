// models/User.mjs
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userType: {
    type: String,
    enum: ['Admin', 'Doctor', 'Patient'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

export default User;
