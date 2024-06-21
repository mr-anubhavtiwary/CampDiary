const express = require('express');
const app = express();
const path = require("path");

app.use.set("view engine", "ejs");
app.set("", path.join(__dirname, 'views'));


app.get("", (req, res) => {
    res.send('home')
})

app.listen(3000, () => {
    console.log("Server is running");
})