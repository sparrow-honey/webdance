const path = require("path");
const fs = require("fs");
const express = require("express");
const { urlencoded } = require("body-parser");
const app = express();
const port=80;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { start } = require("repl");
const { error } = require("console");
const MongoClient = require('mongodb').MongoClient;
// EXPRESS STUFF 
// app.use(express.static('static', options))
app.use("/static",express.static("static"))
app.use(express.urlencoded())
app.use(express.urlencoded({extended: true}));

// MONGOOSE STUFF
con =async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
}
con()
// MAKING SCHEMA 
const Contactschema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String,
});
const Contact = mongoose.model('Contact', Contactschema);


// PUG STUFF 
app.set("view engine", "pug");
app.set("views", path.join(__dirname,"views"));


// OUT-PUT
app.post("/contact",async(req , res)=>{
    const data = new Contact(req.body);
    await data.save(req.body).then(()=>{
        res.send("YOUR FORM HAS BEEN SUBMITTED")
    }).catch(()=>{
            res.status(400).send("ERROR UCCURED")
    });
    
});

// SETTING END POINTS 
    
app.get("/", (req , res)=>{    
    const params ={   }    
    res.render("home.pug", params )
})
app.get("/contact", (req , res)=>{    
    const params ={   }    
    res.render("contact.pug", params )
})

app.listen(port, ()=>{
    console.log(`the app is started at port : ${port}`);
})