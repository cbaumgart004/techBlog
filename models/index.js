const User = require('./User')
const Blog = require('./Blog')
const Comment = require('./Comment')

// User can have many blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE', // Ensures that all children are deleted when the parent is deleted
})

// Blog belongs to a user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
})

// Blog can have many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE', // Ensures that all comments are deleted when the blog is deleted
})

// Comment belongs to a blog
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
})

// Comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

module.exports = { User, Blog, Comment }
