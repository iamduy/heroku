import express from 'express'
import { blogById, create, list, read, remove, update } from '../controller/blog'

const router = express.Router();

router.post('/blog', create);
router.get('/blogs' , list);
router.param('blogById' , blogById);
router.get('/blog/:blogById' , read);
router.put('/blog/:blogById' , update);
router.delete('/blog/:blogById' , remove);
module.exports = router;