import { Router } from "express";
import {
    login,
    register,
    logout,
    refreshToken

} from "../auth/controllers/auth.controller";
import { validate } from '../../middlewares/validate';
import { registerSchema, loginSchema } from './auth.validation';


const router = Router();


router.post('/login',  validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.post('/refresh', refreshToken);
router.post('/logout', logout);



export default router;