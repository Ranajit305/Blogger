import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createComment, deleteComment, editComment, getComment } from '../controllers/comment.controller.js'

const router = express.Router();

router.get('/:blogId', getComment);
router.post('/:blogId', verifyToken, createComment);
router.put('/:commentId', verifyToken, editComment);
router.delete('/:commentId', verifyToken, deleteComment);

export default router