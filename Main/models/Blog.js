const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const Comment = require('./Comment')

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'blog',
  }
)
// add comments to the Blog model
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
})

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
})
module.exports = Blog
