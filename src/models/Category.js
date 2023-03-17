module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, 
    },
    name: DataTypes.STRING,
  },
  {
    timestamps: false, 
    // false para não ter que usar createdAt e updatedAt
    tableName: 'categories',
    underscored: true, 
    // true se os nomes da coluna estão em snake_case
  });

  return Category;
};