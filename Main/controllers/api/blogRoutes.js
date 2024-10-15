const router = require('express').Router()
const { User, Blog } = require('../../models')
const withAuth = require('../../utils/auth')
const connection = require('../../config/connection')
//post a blog route for authenticated users
router.post('/', withAuth, async (req, res) => {
  try {
    console.log('POST /api/blogs called') // Log when the route is hit
    console.log('Request body:', req.body)

    const newBlog = await Blog.create({
      title: req.body.name,
      content: req.body.description,
      user_id: req.session.user_id,
    })

    console.log('New blog created:', newBlog) // Log the newly created blog
    res.status(200).json(newBlog)
  } catch (err) {
    console.error('Error creating blog:', err) // Log the error for debugging
    res.status(400).json(err)
  }
})
//get all blogs route
// Get all blogs for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id, // Only fetch blogs for logged-in user
      },
      include: [{ model: User, attributes: ['name'] }],
    })

    // Serialize data so that it's plain JSON
    const blogs = blogData.map((blog) => blog.get({ plain: true }))

    // Find the user's name (assuming it's stored in session or fetched separately)
    const userName =
      req.session.username || (await User.findByPk(req.session.user_id)).name

    // Render the 'profile' Handlebars template and pass the user and blogs data
    res.render('profile', {
      name: userName, // user's name to display in the profile
      blogs, // blogs to display
      logged_in: req.session.logged_in, // is user logged in
    })
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' })
      return
    }

    res.status(200).json(blogData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
