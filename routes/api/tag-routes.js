const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTags = await Tag.findAll({
      // including its associated Products
      include: [{model:Product}],
    });
    res.status(200).json(allTags);
  
} catch (error) {
  res.status(500).json(error);
} 
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const getATag = await Tag.findByPk(req.params.id, {
      //including its associated Products
      include: [{model:Product}],
    });
    if (!getATag){
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(getATag);
  }
  catch (error) {
    res.status(500).json(error);
  } 
  
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
