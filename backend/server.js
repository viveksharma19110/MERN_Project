const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/userModel");

app.use(express.json());

const cors = require("cors");
app.use(cors());

const userRouter = require("./routes/UserRoutes");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.URL)
    .then(() => {
        console.log("DB connection successful");

        app.listen(PORT, () => {
            console.log(`server started at ${PORT}`);
        });

    }).catch((error) => {
        console.log("DB Error", error);
    });



app.get("/", (req, res) => {
    res.send(`<h1> API is running </h1>`);
});

app.use(userRouter);