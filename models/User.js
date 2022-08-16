const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwtToken = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ,
      'Please provide valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'Please provide passwod'],
  },
})
UserSchema.pre('save', async function () {
  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
})

UserSchema.methods.getName = function () {
  return this.name
}

UserSchema.methods.createJWT = function () {
  return jwtToken.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}
UserSchema.methods.verifyUser = async function (password) {
  return await bcryptjs.compare(password, this.password)
}
module.exports = mongoose.model('User', UserSchema)
