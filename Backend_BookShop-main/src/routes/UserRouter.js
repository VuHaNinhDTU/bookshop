const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');
const { authMiddleware } = require("../Middleware/authMiddleware");
const upload = require('../Middleware/uploadMiddleware');
router.post("/sign-up", userController.createUser)
router.post("/sign-in", userController.LoginUser)
router.post("/log-out", userController.logoutUser)
router.delete("/delete-user/:id", userController.deleteUser)
router.get("/getAll", authMiddleware, userController.getAllUser)
router.get("/get-details/:id", userController.getDetailUser)
router.post("/refresh-token", userController.refreshToken)
router.put(
    '/update-user/:id',
    upload.single('avatar'),
    userController.updateUser
);


module.exports = router;