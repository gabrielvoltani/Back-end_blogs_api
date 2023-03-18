module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, 
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false, 
    // false para não ter que usar createdAt e updatedAt
    tableName: 'users',
    underscored: true, 
    // true se os nomes da coluna estão em snake_case
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      //associação de "User" para "blog_post", usando o método "hasMany". Isso significa que um usuário pode ter vários posts de blog                           
    { foreignKey: 'user_id', as: 'blogposts' });           
    //especifica que a chave estrangeira será usada para vincular os dois modelos e a opção "as" define o nome que será usado para a associação.
  };

    




  return User;
};

