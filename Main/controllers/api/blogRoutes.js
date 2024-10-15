const router = require('express').Router()
const { Blog, User, Comment } = require('../../models') // Include Comment model
const withAuth = require('../../utils/auth')

// GET all blogs with their comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment, // Include Comment model
          include: {
            model: User, // Include User model for comment author
            attributes: ['name'],
          },
        },
      ],
    })

    const blogs = blogData.map((blog) => blog.get({ plain: true }))

    res.status(200).json(blogs)
  } catch (err) {
    console.error('Error fetching blogs:', err)
    res.status(500).json(err)
  }
})
//GET all blogs by a specific user

router.get('/user/:userId', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment, // Include Comment model
          include: {
            model: User, // Include User model for comment author
            attributes: ['name'],
          },
        },
      ],
    })

    const blogs = blogData.map((blog) => blog.get({ plain: true }))

    res.status(200).json(blogs)
  } catch (err) {
    console.error('Error fetching blogs:', err)
    res.status(500).json(err)
  }
})

//POST a new blog

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.name,
      content: req.body.description,
      user_id: req.session.user_id,
    })

    console.log('New blog created:', newBlog)
    console.log('createdAt:', newBlog.createdAt)
    res.status(200).json(newBlog)
  } catch (err) {
    console.error('Error creating blog:', err)
    res.status(400).json(err)
  }
})
// GET a single blog by ID with comments
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment, // Include Comment model
          include: {
            model: User, // Include User model for comment author
            attributes: ['name'],
          },
        },
      ],
    })

    if (!blogData) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    const blog = blogData.get({ plain: true })
    console.log('Blog fetched:', blog)
    console.log('createdAt:', blog.createdAt)

    res.status(200).json(blog)
  } catch (err) {
    console.error('Error fetching blog:', err)
    res.status(500).json(err)
  }
})

// POST a new comment
router.post('/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      blog_id: req.body.blogId,
      user_id: req.session.user_id,
    })

    // Include the user data in the response
    const fullComment = await Comment.findByPk(newComment.id, {
      include: { model: User, attributes: ['name'] },
    })

    res.status(200).json(fullComment)
  } catch (err) {
    console.error('Error submitting comment:', err)
    res.status(500).json(err)
  }
})

module.exports = router
