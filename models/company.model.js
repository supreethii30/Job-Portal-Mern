import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,  //comapny name 
        required:true,
        unique:true
    },
     description:{
        type:String
    },
     website:{
        type:String
    },
     location:{
        type:String
    },
    logo:{
        type:String  //URL to company logo keeping the url here
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{timestamps:true});
export const Company = mongoose.model("Company", companySchema);