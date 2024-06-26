const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const axios = require("axios");

mongoose.connect("mongodb+srv://Anubhav:Anubhav%40152000@campdiary.lqd08s3.mongodb.net/?retryWrites=true&w=majority&appName=CampDiary");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image
async function seedImg() {
try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
    params: {
        client_id: 'Ig3gFuzMLLHNoecacDPfpIHftmSz4hvrB-xpxin03Mc',
        collections: 9046579,
    },
    })
    return resp.data.urls.small
} catch (err) {
    console.error(err)
}
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 2; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: await seedImg(),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price: price,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})