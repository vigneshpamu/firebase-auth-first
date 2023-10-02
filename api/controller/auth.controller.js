import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

// export const signUp = async (req, res, next) => {
//   const { username, email, password } = req.body
//   const hashedPassword = bcryptjs.hashSync(password, 10)
//   const newUser = new User({ username, email, password: hashedPassword })
//   try {
//     await newUser.save()
//     res.status(201).json('User Created Successfully')
//   } catch (error) {
//     next(error)
//   }
// }

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('User Already Exist')
  }

  const newUser = await User.create({
    username,
    email,
    password,
  })

  if (newUser) {
    generateToken(res, newUser._id)
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// export const signIn = async (req, res, next) => {
//   const { email, password } = req.body
//   try {
//     const validUser = await User.findOne({ email })
//     if (!validUser) return next(errorHandler(404, 'User Not Found'))
//     const validPassword = bcryptjs.compareSync(password, validUser.password)
//     if (!validPassword) return next(errorHandler(404, 'Wrong Credentials'))
//     const { password: pass, ...rest } = validUser._doc

//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
//     res
//       .cookie('access_token', token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json(rest)
//   } catch (error) {
//     next(error)
//   }
// }

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc
      generateToken(res, user._id)
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      })
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      //   const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: generatedPassword,
        avatar: req.body.photo,
      })

      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc
      generateToken(res, user._id)
      res.status(201).json(rest)
    }
  } catch (error) {
    res.status(400)
    throw new Error('Invalid User Data')
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('jwt')
    res.status(200).json('User has been logged out')
  } catch (error) {
    next(error)
  }
}
