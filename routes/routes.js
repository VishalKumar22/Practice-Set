const express = require("express")
const { signup, login, profile, update } = require("../controllers/userController")
const validate = require("../middleware/validate")
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/profile", validate, profile)
router.put("/update", validate, update)


module.exports = router