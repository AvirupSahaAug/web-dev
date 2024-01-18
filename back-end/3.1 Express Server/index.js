import express from "express"
const app= express()
const port =3000
app.listen(port,()=>{
    console.log("hell yeah!!")
})
app.get("/",(req,res)=>{
    console.log(req.raw)
    res.send("Home")
    }
)
app.get("/Contacts",(req,res)=>{
    console.log(req.raw)
    res.send("Contacts")
    console.log("potato")
    }
)
app.get("/About",(req,res)=>{
    console.log(req.raw)
    res.send("About")
    console.log("wee!")
    }
)