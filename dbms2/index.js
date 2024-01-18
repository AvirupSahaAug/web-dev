// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dogsDB');
  console.log("wee")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const dogSchema=new mongoose.Schema ({
    name:String,
    age:{
        type:Number,
        min:1,
        max:30
    }
}); 
const Dog =mongoose.model("Dog",dogSchema);

const dog =new Dog ({
    name:"bullet",
    age:10
});
// dog.save();
console.log("done");
Dog.insertMany([{
    name:"nois",
    age:4
},
{
    name:"wee",
    age:8,
    fav:"bone"
}]).then(()=>{
    console.log("job is done");
    mongoose.connection.close();
});
//Dog.find();
//Dog.update({-id:"6537effac902767f2e3d810c"});
//Dog.delete();
//const schemaname= new mongoose.Schema{
//    key:type n shit,
//    reference key to another shit:schma of that shit
//} while declaring the variable ,,for the reference key the value should be a variable that is an object of the model
