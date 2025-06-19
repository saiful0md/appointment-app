const express = require("express")
const { logInController, registerController, authController, aplayDoctorController, applyDoctorController, getAllNotificationsController } = require("../controllers/userControllers")
const authMiddleware = require("../middleware/authMiddleware")

//router object
const router =express.Router()

// routes
// REGISTER || POST
router.post("/register", registerController)

// logIng || POST
router.post("/login", logInController)

// Auth || POST
router.post("/getUserData", authMiddleware, authController)

// Applay Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController)

// GetAllNotifications || GET
router.get("/get-all-notifications", authMiddleware, getAllNotificationsController)

module.exports = router