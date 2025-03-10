const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');
const { authMiddleware } = require("../Middleware/authMiddleware");

router.post("/sign-up", userController.createUser)
router.post("/sign-in", userController.LoginUser)
router.post("/log-out", userController.logoutUser)
router.put("/update-user/:id", userController.updateUser)
router.delete("/delete-user/:id", userController.deleteUser)
router.get("/getAll", authMiddleware, userController.getAllUser)
router.get("/get-details/:id", userController.getDetailUser)
router.post("/refresh-token", userController.refreshToken)

module.exports = router;