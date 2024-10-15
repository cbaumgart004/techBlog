const router = require('express').Router()
const { User, Blog } = require('../../models')
const withAuth = require('../../utils/auth')
const connection = require('../../config/connection')
//post a blog route for authenticated users
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.name, // Ensure this matches what you send in the request
      content: req.body.description, // Ensure this matches what you send in the request
      user_id: req.session.user_id,
    })
    res.status(200).json(newBlog)
  } catch (err) {
    console.error(err) // Log the error for debugging
    res.status(400).json(err)
  }
})
//get all blogs route
// Get all blogs for the logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      // include the User model to snag details
      include: [{ model: User, attributes: ['name'] }],
    })

    // Serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }))

    // Render the Handlebars template and pass the blogs data
    res.render('blog', {
      blogs,
      logged_in: req.session.logged_in, // Pass logged-in status if needed
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
