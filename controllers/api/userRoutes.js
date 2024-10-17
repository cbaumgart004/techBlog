const router = require('express').Router()
const connection = require('../../config/connection')
const { User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)

    // Log the username and user ID after creating the user
    console.log(
      `New User Created: Username - ${userData.username}, User ID - ${userData.id}`
    )

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true

      res.status(200).json(userData)
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } })

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    const validPassword = await userData.checkPassword(req.body.password)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' })
      return
    }

    // Log the username and user ID after successful login
    console.log(
      `User Logged In: Username - ${userData.username}, User ID - ${userData.id}`
    )

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true

      res.json({ user: userData, message: 'You are now logged in!' })
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
