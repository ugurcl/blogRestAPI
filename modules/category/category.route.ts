import express from 'express';
import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory
} from './category.controller';
import { authenticate } from '../../middlewares/auth.middlewares';
import { isAdmin } from '../../middlewares/isAdmin.middleware';


const router = express.Router();


router.post('/', authenticate, isAdmin, createCategory);
router.get('/', authenticate ,isAdmin ,getAllCategories);
router.put('/:id', authenticate, isAdmin, updateCategory);
router.delete('/:id', authenticate, isAdmin, deleteCategory);

export default router;
