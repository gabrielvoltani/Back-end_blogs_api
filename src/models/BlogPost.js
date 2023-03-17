module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, 
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type:DataTypes.STRING, },
    published: DataTypes.STRING,
    updated: DataTypes.STRING,
  },
  {
    timestamps: false, 
    // false para não ter que usar createdAt e updatedAt
    tableName: 'blog_posts',
    underscored: true, 
    // true se os nomes da coluna estão em snake_case
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
    // belongsTo quer dizer que pertence a alguém, ou seja, a user_id é foreignKey
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return BlogPost;
};