const mongoose= require('mongoose');
const initData= require("./data.js");
const Listing= require("../Models/Listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WanderLust');
}

main().then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
});

const initDB= async()=>{
    await Listing.deleteMany({});
    let newArray= initData.data.map((obj)=>({...obj, owner:'698445cf482a369bf16bd0ff'}));
    await Listing.insertMany(newArray);
    console.log("Data is initialized")
};
initDB();

