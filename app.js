const express = require('express');
const path = require("path");
const mongoose =  require("mongoose");
const Campground = require("./models/campground");

//database
const uri = "mongodb+srv://Anubhav:Anubhav%40152000@campdiary.lqd08s3.mongodb.net/?retryWrites=true&w=majority&appName=CampDiary"

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();


//view engine
app.set("view engine", "ejs");
app.set("", path.join(__dirname, 'views'));


// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

//home route
app.get("", (req, res) => {
    res.send('home')
})


app.get("/makecampground", async (req, res) => {
    const camp = new Campground({title: "My Backyard", description: "Cheap Price"});
    await camp.save();
    res.send(camp)
})

//starting server
app.listen(3000, () => {
    console.log("Server is running");
})

// http://127.0.0.1:3000/