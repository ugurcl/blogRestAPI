import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middlewares";
import { isAdmin } from "../../middlewares/isAdmin.middleware";
import { upload } from "../../utils/multer";
import {
  createPost,
  deletePost,
  updatePost,
  getPostBySlug,
  getAllPosts,
  likePost,
  dislikePost
} from "./post.controller";

const router = Router();

router.get("/", getAllPosts);
router.get('/:slug', getPostBySlug);
router.post('/', authenticate, isAdmin,upload.single('headerImage'), createPost);
router.put('/:id', authenticate,isAdmin, upload.single('headerImage'), updatePost);
router.delete('/:id', authenticate,isAdmin, deletePost);
router.post('/:id/like', authenticate, likePost);
router.post('/:id/dislike', authenticate, dislikePost);


export default router;
