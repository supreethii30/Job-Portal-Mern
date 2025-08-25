import mongoose from "mongoose";  //database schema

const applicationSchema = new mongoose.Schema({
    job:{
         //for the applicants they should know what company they are applying for
         type:mongoose.Schema.Types.ObjectId, //comapny information
         ref:'Job', //creating relation between application and job
         required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        //if the user/applicant is accepted or rejected
        type:String,
        //options we use enum{enumeration}
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    },
},{timestamps:true});
export const Application = mongoose.model("Application", applicationSchema);