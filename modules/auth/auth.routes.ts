import { Router } from "express";
import {
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword

} from "../auth/controllers/auth.controller";
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema } from './auth.validation';


const router = Router();


router.post('/login',  validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;