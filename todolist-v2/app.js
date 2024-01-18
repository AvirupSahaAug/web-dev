//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require('mongoose')

const app = express();
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
const Itemschema ={
  name:String
}
const item=mongoose.model("item",Itemschema);
const item1 =new item({
  name:"welcome to your to do list"
});
const item2 =new item({
  name:"hit plus to ad new item"
});
const item3 =new item({
  name:"hit dis to delete shit"
});
const defaultitems=[item1,item2,item3];
item.insertMany(defaultitems,{
  writeConcern:"shit went boom",
  ordered:false
})
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
