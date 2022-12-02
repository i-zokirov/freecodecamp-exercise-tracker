const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
connectDB();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRoutes);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
