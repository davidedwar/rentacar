const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");


const userSchema = new Schema({
  password:{
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: false
  },
  username: {
    type: String,
    default: null
  },
  phone: String,
  companyName:{
    type:String
  }, 
  companyAddress:{
    type:String
  },
  email:{
    type: String,
    // unique: true,
    default: null
  },
  postings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        default:[]
    }]

  },
  
{ timestamps: true });

// userSchema.pre("save", async function(next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     let hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// userSchema.methods.comparePassword = async function(candidatePassword, next) {
//   try {
//     let isMatch = await bcrypt.compare(candidatePassword, this.password);
//     return isMatch;
//   } catch (err) {
//     return next(err);
//   }
// };

const User = mongoose.model('User', userSchema);

module.exports = User;