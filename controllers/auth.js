const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require('../errors')

const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    throw new BadRequestError(
      'one of the parameter is not passed, please provide name,email and passsword'
    )
  }
  console.log(`reached the register flow ${name} ${email}`)
  const user = await User.create({ name, email, password })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    user: { name: user.getName(), token: user.createJWT() },
  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError(
      'one of the parameter is not passed, please provide email and passsword'
    )
  }
  console.log(`reached the register flow  ${email}`)
  const user = await User.findOne({ email })

  if (!user?.name) {
    throw new NotFoundError(`user details not found with email : ${email}`)
  }

  const isEqual = await user.verifyUser(password)
  if (!isEqual) {
    throw new UnauthenticatedError(
      `Invalid credentials entered, either user/password wrong`
    )
  }
  console.log(`user details: ${user}`)
  res.json({
    status: 'success',
    user: { name: user.getName(), token: user.createJWT() },
  })
}

module.exports = { register, login }
