const express = require("express")
const UserController = require("../controllers/UserController")
const {validateUser, validateLogin} = require('../utils/validators');

const router = express.Router();

router.post("/auth/login", validateLogin, UserController.loginUser)

router.get("/user/:limit/:offset", UserController.allUsers)
router.post("/user", validateUser, UserController.createUser)
router.put("/user/:id", validateUser, UserController.updateUser)
router.delete("/user/:id", UserController.deleteUser)
router.get("/userDetail/:id", UserController.detailUser)

module.exports = router
