const Mongoose = require('mongoose');

const UserBalanceSchema = new Mongoose.Schema({
  account_number:{
    type: String,
    required: true,
    unique: true
  },
  balance: { 
    type: Number, 
    default: 0 
  } ,
  user_id: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps:true });

module.exports = Mongoose.model('UserBalance', UserBalanceSchema);