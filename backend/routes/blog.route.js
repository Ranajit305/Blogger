import express from 'express'
import { createBlog, deleteBlog, editBlog, getBlogs, noUserCategoryBlogs, userCategoryBlogs } from '../controllers/blog.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router();

router.get('/', verifyToken, getBlogs);
router.get('/category/noUser/:category', noUserCategoryBlogs);
router.get('/category/user/:category', verifyToken, userCategoryBlogs);

router.post('/create', verifyToken, createBlog);
router.put('/:blogId', verifyToken, editBlog);
router.delete('/:blogId', verifyToken, deleteBlog);

export default router