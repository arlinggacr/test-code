const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", userController.getAllUser);

router.post("/", authMiddleware, userController.createUser);

router.get(
  "/account/:id",
  authMiddleware,
  userController.getUserByAccountNumber
);
router.get(
  "/identity/:id",
  authMiddleware,
  userController.getUserByIdentityNumber
);

// adding some cases
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
