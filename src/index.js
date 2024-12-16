
const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
//use EJS as the view engine
app.set("view engine", "ejs");

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: username });
    if (existingUser) {
        return res.status(400).send("Username already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const data = {
        name: username,
        password: hashedPassword
    };

    // Insert new user into the database
    const userdata = await collection.insertMany(data);
    console.log(userdata);

    res.status(201).send("User registered successfully");
});
//login user
app.post("/login",async (req,res)=>{
    try{
        const check  =await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        //compare the hash password from the database with the plain text
        const isPasswordMatch =await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");

        }else{
            req.send("wrong password")
        }
    }catch{
        res.send("wrong details");
    }

});
// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

