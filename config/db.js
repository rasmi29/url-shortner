import mongoose from "mongoose";

async function connectDb(){
    mongoose.connect("mongodb+srv://rasmi29:rasmi2003@cluster0.qksoq4u.mongodb.net/urlshort")
    .then(()=> console.log("database connected successfully"))
    .catch((err)=> console.log(`error in datrabase connection : ${err}`))
}

export default connectDb