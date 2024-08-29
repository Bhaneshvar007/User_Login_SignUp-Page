const express = require("express");
const app = express();
const path = require("path");
const dataDb = require("./models/loginData.js");
const mongoose = require("mongoose");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public'))); // Serving static files from 'public' directory
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded data



main().then(() => {
    console.log('Connection to MongoDB successful');
}).catch(err => console.log('Error connecting to MongoDB:', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/LoginPage');
}





// fetching data from the user.
app.get("/signup", (req, res) => {
    res.render("signup");
})

app.post('/signup', async (req, res) => {
    let newData = new dataDb(req.body);
    await newData.save();
    console.log(newData);
    res.redirect('/');
});


app.get('/', async (req, res) => {
    try {
        // Fetch data from the database to display on the dashboard
        const userData = await dataDb.find({});
        res.render('dashboard', { userData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get("/error",function(req,res){
    res.render("error")
})


app.get("/login", (req, res) => {
    res.render("login");
})


app.post("/login", async (req, res) => {
    const { email, pass, ph_num } = req.body;
    const user = await dataDb.findOne({ email });
    const password = await dataDb.findOne({ pass });
    const phone = await dataDb.findOne({ ph_num });

    if ((user || phone) && password) {
        res.redirect('/welcome'); // redirect to a welcome or another page
    } else {
        res.redirect('/error'); // redirect to a error or another page
    }

});


// app.js or main server file

app.get('/welcome', (req, res) => {
    res.render('welcome');
});





app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
