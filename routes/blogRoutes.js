const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// get all document datas
router.get('/', blogController.blogIndex);
// create new data
router.get('/create', blogController.blogCreateGet);
// add new blog
router.post('/', blogController.blogCreatePost);
// show specifi document/record
router.get('/:id', blogController.blogDetails);

router.put('/:id', blogController.blogEdit);
// delete document/record
router.delete('/:id', blogController.blogDelete);

module.exports = router;