module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true},
    categoryId: { type:DataTypes.INTEGER },
  },
  {
    timestamps: false, 
    // false para não ter que usar createdAt e updatedAt
    tableName: 'posts_categories',
    underscored: true, 
    // true se os nomes da coluna estão em snake_case
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'blogCategories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })

      models.Category.belongsToMany(models.BlogPost, {
        as: 'categoryBlog',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
    })
    }

  return PostCategory;
};