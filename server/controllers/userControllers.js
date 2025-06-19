const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModels");
// register Callback
const registerController = async (req, res) => {
  try {
    const existUser = await userModel.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).send({ message: `User Already Exist` });
    }
    const salt = await bcrypt.genSalt(10);
    const heshedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new userModel({ ...req.body, password: heshedPassword });
    await newUser.save();
    res
      .status(201)
      .send({ message: `Registation Successfully`, success: true });
  } catch (error) {
    res.status(500).send({ message: `Register Controller ${error.message}` });
  }
};

// LogIn
const logInController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found", success: false });
    }
    // user password compare
    const isMatchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isMatchPassword) {
      return res
        .status(401)
        .send({ message: "Invalid Email or Password", success: false });
    }
    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ message: "Login Succssefully", success: true, token });
  } catch (error) {
    res.status(500).send({ message: `Login Controller ${error.message}` });
  }
};

//  Auth Controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    user.password = undefined;

    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(401).send({ message: "Auth error", success: false, error });
  }
};

// Applay doctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });

    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctor",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Error While Applying For Doctor" });
  }
};
// getAllNotifications CTRL
const getAllNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notifiaction = user.notification;
    seenNotification.push(...notifiaction);
    user.notification = [];
    user.seenNotification = notifiaction;
    const updatedUser = await user.save();
    res.status(200).sand({
      success: true,
      message: "all notification marked read",
      data:updatedUser
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in notifiaction",
      success: false,
      error,
    });
  }
};
module.exports = {
  registerController,
  logInController,
  authController,
  applyDoctorController,
  getAllNotificationsController,
};
