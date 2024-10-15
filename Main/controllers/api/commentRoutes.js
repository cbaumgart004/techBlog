const router = require('express').Router()
const { Comment, Blog } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.commentText,
      blog_id: req.body.blogId,
      user_id: req.session.user_id,
    })

    res.status(200).json(newComment)
  } catch (err) {
    console.error('Error submitting comment:', err)
    res.status(500).json(err)
  }
})

module.exports = router
