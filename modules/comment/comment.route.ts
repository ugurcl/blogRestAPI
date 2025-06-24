import { Router } from 'express';
import { addComment, deleteComment, getCommentsByPost } from './comment.controller';
import { authenticate } from '../../middlewares/auth.middlewares';

const router = Router();

router.post('/', authenticate, addComment);
router.delete('/:id', authenticate, deleteComment);
router.get('/post/:postId', getCommentsByPost);

export default router;
