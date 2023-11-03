// Start of JS file
// Index file to execute the models files.
// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, 
  {
    foreignKey: 'product_id'
  });
  
// Categories have many Products
Category.hasMany(Products, 
  {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
  });

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, 
  {
    through: 
    {
      model: ProductTag,
      unique: false
    },
    as: '' // TODO: name here
  });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, 
  {
    through: 
    {
      model: ProductTag,
      unique: false
    },
    as: '' // TODO: name here
  });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
// End of JS file