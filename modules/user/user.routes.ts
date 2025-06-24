import { Router } from "express";
import {
    getMe,
    updateMe,
    getAllUsers,
    deleteUser,
    updateUserRole
} from "./user.controller";


import {authenticate} from "../../middlewares/auth.middlewares";
import {isAdmin} from "../../middlewares/isAdmin.middleware";
import {upload} from '../../utils/multer';
import { validate } from "../../middlewares/validate";
import { updateUserSchema } from "../auth/auth.validation";


const router = Router();


router.route('/me').get(authenticate, getMe)
                   .put(authenticate, upload.single('avatar'), validate(updateUserSchema), updateMe);


router.get('/all', authenticate, isAdmin, getAllUsers);
router.delete('/:id', authenticate, isAdmin, deleteUser);
router.patch('/:id/role', authenticate, isAdmin, updateUserRole);

export default router;