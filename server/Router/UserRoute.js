import express, {Router} from 'express';
import { getUser, login, signup } from '../Controllers/UserController.js';

const router = Router();

router.post('/register', signup);
router.post('/login', login);
router.post('/getUser', getUser);

export default router;