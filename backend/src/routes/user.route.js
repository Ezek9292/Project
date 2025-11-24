import { Router } from "express";
import { registerUser, loginUser, logOutuser } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logOutuser)


// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.

export default router;