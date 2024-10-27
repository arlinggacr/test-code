const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", userController.createUser);

router.get("/", userController.getAllUser);

router.get("/account/:id", userController.getUserByAccountNumber);

router.get("/identity/:id", userController.getUserByIdentityNumber);

// adding some cases
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
