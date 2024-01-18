import express from "express";
import ejs from "ejs";
const app=express();
var d=new Date();
var a=d.getDay()
console.log(a)

app.listen(3000,()=>{
    console.log("server is running")
})
app.get("/",(req,res)=>{
    
    res.render("index.ejs",{
        day:"weekday",
        work:"its time to work hard"
    })
})