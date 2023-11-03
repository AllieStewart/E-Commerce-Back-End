// Start of JS file
// File for tag routes.
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try 
  {
    const tagData = await Tag.findAll( 
    {
      include: [{ model: Product }],
    });

    res.status(200).json(tagData);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try 
  {
    const tagData = await Tag.findByPk(req.params.id, 
    {
      include: [{ model: Product }],
    });
    
    if (!tagData) 
    {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try 
  {
    const newTagData = await Tag.create(
    {
      category_id: req.body.category_id,
    });
      res.status(200).json(newTagData);
  } 
  catch (err) 
  {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // TODO:
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      // if (req.body.tagIds && req.body.tagIds.length) {

      //   ProductTag.findAll({
      //     where: { product_id: req.params.id }
      //   }).then((productTags) => {
      //     // create filtered list of new tag_ids
      //     const productTagIds = productTags.map(({ tag_id }) => tag_id);
      //     const newProductTags = req.body.tagIds
      //       .filter((tag_id) => !productTagIds.includes(tag_id))
      //       .map((tag_id) => {
      //         return {
      //           product_id: req.params.id,
      //           tag_id,
      //         };
      //       });

      //     // figure out which ones to remove
      //     const productTagsToRemove = productTags
      //       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      //       .map(({ id }) => id);
      //     // run both actions
      //     return Promise.all([
      //       Category.destroy({ where: { id: productTagsToRemove } }),
      //       Category.bulkCreate(newProductTags),
      //     ]);
      //   });
      // }

      return res.json(tag);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try 
  {
    const tagData = await Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    });

  if (!tagData) 
  {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
  res.status(200).json(tagData);
  } 
  
  catch (err) 
  {
    res.status(500).json(err);
  }
});

module.exports = router;
// End of JS file