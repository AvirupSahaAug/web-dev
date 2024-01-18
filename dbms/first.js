import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{useNewUrlParser:true});
const personSchema=new mongoose.Schema ({
    name:String,
    age:Number
}); 

const Person =mongoose.model("Person",personSchema);

const person =new Person ({
    name:"john wickis the best",
    age:4
});
person.save();
