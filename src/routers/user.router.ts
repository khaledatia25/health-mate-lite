import express from "express";
import {
  signup,
  login,
  logout,
  logoutAll,
  deleteMe,
} from "../controller/user.controller";
import auth from "../middleware/auth";
const router = express.Router();

router.post("/users", signup);
router.post("/users/login", login);
router.post("/users/logout", auth, logout);
router.post("/users/logoutAll", auth, logoutAll);
router.delete("/users/me", auth, deleteMe);

export default router;
