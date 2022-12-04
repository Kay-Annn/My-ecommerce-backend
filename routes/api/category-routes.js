const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  try {
    const allCategories = await Category.findAll({
      // including its associated Products
      include: [{model:Product}],
    });
    res.status(200).json(allCategories);
  
} catch (error) {
  res.status(500).json(error);
} 
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
try {
  const getACategory = await Category.findByPk(req.params.id, {
    //including its associated Products
    include: [{model:Product}],
  });
  if (!getACategory){
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(getACategory);
}
catch (error) {
  res.status(500).json(error);
} 
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(400).json(error);
  }
  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update (
    {
    category_name: req.body.category_name,
  },

{
  where:{
    id:req.params.id
  },
}
)
.then ((updatedCategory) => {
  res.json(updatedCategory)
})
  .catch((err)=>res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
