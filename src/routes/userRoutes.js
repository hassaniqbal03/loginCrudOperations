// const express = require("express");
// const router = express.Router();
// const authController = require("./controller/authController");
// const userController = require("./controller/userController"); 

// const verifyToken = require("./middleware");
// const { validateSignup, validateLogin, validateUpdateUser, validateUpdatePassword,validateGetUserById,validateGetAllUsers,validateDeleteUser } = require("./validations/userValidation");


// // Authentication Routes
// router.post("/signup", validateSignup, authController.register);
// router.post("/login", validateLogin, authController.login);

// // User Routes (Protected)

// router.put("/update-password", verifyToken, validateUpdatePassword, userController.updatePassword);
// router.get("/", verifyToken,validateGetAllUsers, userController.getAllUsers);
// router.get("/:id", verifyToken,validateGetUserById, userController.getUserById);
// router.put("/:id", verifyToken, validateUpdateUser, userController.updateUser);
// router.delete("/:id", verifyToken,validateDeleteUser, userController.deleteUser);

// module.exports = router;


const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware");
const { 
  validateGetAllUsers,
  validateUpdateUser, 
  validateUpdatePassword, 
  validateGetUserById, 
  validateDeleteUser 
} = require("../validations/userValidation");

router.use(verifyToken);
router.get("/",validateGetAllUsers, userController.getAllUsers);
router.get("/profile",validateGetUserById, userController.getUserById);
router.put("/profile-update", validateUpdateUser, userController.updateUser);
router.put("/update-password", validateUpdatePassword, userController.updatePassword);
router.delete("/delete", validateDeleteUser, userController.deleteUser);

module.exports = router;
