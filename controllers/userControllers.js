const User = require("../models/userModel");
const Exercise = require("../models/exerciseModel");
const catchAsyncErrors = require("../utils/catchAsyncError");
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.registerUser = catchAsyncErrors(async (req, res) => {
    const { username } = req.body;
    if (username) {
        const user = await User.create({ username });
        res.json(user);
    } else {
        res.status(401).json({ error: "Invalid data" });
    }
});

exports.registerExercise = catchAsyncErrors(async (req, res) => {
    const { _id } = req.params;
    const { duration, description } = req.body;

    const user = await User.findById(_id);
    if (user) {
        const exercise = await Exercise.create({
            duration,
            description,
            date: req.body.date || new Date(),
            userId: user._id,
        });
        const response = {
            ...exercise._doc,
            username: user.username,
            _id: user._id,
        };
        delete response.userId;
        response.date = response.date.toDateString();
        res.json(response);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

exports.getLogs = catchAsyncErrors(async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const user = await User.findById(_id);
    if (user) {
        const exercises = await Exercise.find({ userId: user._id });
        let filtered = [];
        for (let exercise of exercises) {
            filtered.push({
                ...exercise._doc,
                date: exercise._doc.date.toDateString(),
            });
        }
        if (from) {
            filtered = filtered.filter(
                (exercise) =>
                    new Date(exercise.date) > new Date(from) && exercise
            );
        }
        if (to) {
            filtered = filtered.filter(
                (exercise) => new Date(exercise.date) < new Date(to) && exercise
            );
        }

        const sorted = filtered.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        res.json({
            ...user._doc,
            count: exercises.length,
            log: limit
                ? limit < sorted.length
                    ? sorted.slice(sorted.length - limit, sorted.length)
                    : sorted
                : sorted,
        });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});
