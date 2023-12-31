// Start of JS file
// File for tag routes.
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll( 
    {
      attributes: ["id", "tag_name"],
      include: 
      [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id'],
          through: ProductTag 
        }
      ],
    })
    .then((tagData) => {
      res.json(tagData);
    })
  .catch ((err) =>
  {
    res.status(500).json(err);
  });
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
    await Tag.findByPk(req.params.id, 
    {
      include: 
      [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id'],
          through: ProductTag 
        }
      ],
    })
    .then((tagData) => {
      if (!tagData) 
      {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      res.json(tagData);
    })
  .catch ((err) =>
  {
    res.status(500).json(err);
  });
});

router.post('/', async (req, res) => {
  // create a new tag
    await Tag.create(
    {
      tag_name: req.body.tag_name,
    }).then(newTagData => {
          res.json(newTagData);
  }).catch (err => {
    res.status(500).json(err);
  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    tag_name: req.body.tag_name,
    where: {
      id: req.params.id,
    },
  }).then((tagData) => {
    if (!tagData) 
    {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.json(tagData);
  }).catch ((err) => {
  res.status(500).json(err);
});
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
    await Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    }).then(tagData => 
  {
  if (!tagData) 
  {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
  res.json(tagData);
  }).catch((err) =>
  {
    res.status(500).json(err);
  });
});

module.exports = router;
// End of JS file