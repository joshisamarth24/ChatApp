import Router  from "express";
import multer from "multer";
import { login, signup, logout } from "../controllers/authControllers.js";

const router = Router();

const upload = multer({dest:"uploads/"});

router.post("/login", login);
router.post("/signup",upload.single("profilePic"), signup);
router.post("/logout", logout);

export default router;