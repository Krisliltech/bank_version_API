const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
},  { timestamps:true });

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
  
    this.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});
  
module.exports = Mongoose.model('User', UserSchema);