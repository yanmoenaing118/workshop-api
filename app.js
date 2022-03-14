require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('db connect success');
    } catch (error) {
        console.log(error);
    }
}
connect();

const dramaRouter = require("./routes/drama");
const authRouter = require("./routes/auth");
const songRouter = require("./routes/song");

app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/dramas", dramaRouter);
app.use("/api/v1/songs", songRouter)


app.listen(3000, () => {
    console.log('server running on port 3000');
})