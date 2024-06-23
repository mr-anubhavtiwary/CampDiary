const express = require('express');
const path = require("path");
const mongoose =  require("mongoose");
const methodOverride = require("method-override");
const Campground = require("./models/campground");
const ejsMate = require("ejs-mate");

//database
const url = "mongodb+srv://Anubhav:Anubhav%40152000@campdiary.lqd08s3.mongodb.net/?retryWrites=true&w=majority&appName=CampDiary"

mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();


//view engine
app.set("view engine", "ejs");
app.set("", path.join(__dirname, 'views'));

//parsing for post res
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//home route
app.get("/", (req, res) => {
    res.render('home')
})


app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds })
})

//Create from CRUD
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})

app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

//read from CRUD
app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", { campground });
})

//Update from CRUD
app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`);
});

//delete CRUD
app.delete("/campgrounds/:id", async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(req.params.id);
    res.redirect("/campgrounds");
});


//starting server
app.listen(3000, () => {
    console.log("Server on port 3000");
});

// http://127.0.0.1:3000/