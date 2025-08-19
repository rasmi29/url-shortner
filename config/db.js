import mongoose from "mongoose";

async function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("database connected successfully"))
    .catch((err)=> console.log(`error in datrabase connection : ${err}`))
}

export default connectDb