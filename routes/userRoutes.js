const express = require("express");
const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");
const {
    getUsers,
    registerUser,
    registerExercise,
    getLogs,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").get(getUsers).post(registerUser);

router.route("/:_id/exercises").post(registerExercise);

router.route("/:_id/logs").get(getLogs);
module.exports = router;
