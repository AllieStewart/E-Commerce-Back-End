// Start of JS file
// File for category routes.
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    const categoryData = await Category.findAll( 
    {
      attributes: ["id", "category_name"],
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }]
    })
    .then((categories) => {
      res.json(categories);
    })
  .catch (err) 
  {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id, 
    {
      attributes: ["id", "category_name"],
      include: [
        { 
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"]
        }
      ],
    }).then((categoryData) => {
      if (!categoryData) 
      {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
      res.status(200).json(categoryData);

    }).catch((err) =>
  {
    res.status(500).json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new category
    const newCatData = await Category.create(
    {
      category_id: req.body.category_id,
    }).then((newCatData) => res.status(200).json(newCatData))
  .catch((err) =>
  {
    res.status(400).json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
   await Category.destroy(
    {
      where: {
        id: req.params.id,
      },
    }).then((categoryData) => {
      if (!categoryData) 
      {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
      res.status(200).json(categoryData);
    }).catch((err) =>
  {
    res.status(400).json(err);
  });
});

module.exports = router;
// End of JS file