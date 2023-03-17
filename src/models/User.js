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

  return User;
};