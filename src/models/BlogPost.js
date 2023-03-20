module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type:DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
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
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return BlogPost;
};

