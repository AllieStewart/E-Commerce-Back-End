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
    foreignKey: 'category_id'
  });
  
// Categories have many Products
Category.hasMany(Products, 
  {
    foreignKey: 'category_id',
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
    as: 'product_tags'
  });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, 
  {
    through: 
    {
      model: ProductTag,
      unique: false
    },
    as: 'tags_info'
  });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
// End of JS file