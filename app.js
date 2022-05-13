//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Welcome to your Journal";
const aboutContent = "I am a journal";
const contactContent = " You can contact me at 1-800-Journal";
const posts = [];


const app = express();


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/",function(req,res)
{
 res.render("home", { homeText:homeStartingContent,post:posts});
})



app.get("/contact",function(req,res)
{
  res.render("contact", {contactText:contactContent});
})



app.get("/about",function(req,res)
{
  res.render("about", {aboutText:aboutContent});
})




app.get("/compose",function(req,res)
{
  res.render("compose")
})





app.post("/compose",function(req,res)
{
  
  
  let journalEntry = 
  {
    title: req.body.title,
    body:req.body.postInputTextArea
  }
  
  
  posts.push(journalEntry);
  
  
  res.redirect("/");
  
})

app.get("/posts/:day",function(req,res)
{

const reqTitle = _.lowerCase(req.params.day);

  posts.forEach(function(posts) 
  {
    
     const stored = posts.title;
     const lowerStored = _.lowerCase(stored);

    if(reqTitle === lowerStored  )
    {
      
      res.render("post", {title:posts.title,body:posts.body})
    }
   

  });


})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
