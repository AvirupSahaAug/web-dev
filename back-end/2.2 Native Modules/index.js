const fs = require("fs");
fs.writeFile("potato.txt","potato is the best",(err)=>{
    if (err) throw err;
    console.log("file has been saved")
})
fs.readFile("potato.txt","utf8",(err,data)=>{
    if (err) throw err;
    console.log(data);
})