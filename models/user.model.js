import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],  //enum=enumeration{restricting a value to a fixed set of choices}
        required:true
    },
    profile:{  //here not using required cause we are making the profile first time 
        bio:{type:String}, 
        skills:[{type:String}],
        resume:{type:String}, //URL to resume file{adding the URL to the resume file}
        resumeOriginalName:{type:String},//{To generate name with .pdf i.e:preethi.pdf}
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},//genearting relation betweeen company table and the user table{storing the company id the schema}
        profilePhoto:{
            type:String,
            default:""
        }
      },

},{timestamps:true});
export const User = mongoose.model('User',userSchema); 
//we will be having 4 types of schema {1 is for the user, 2 is if you have job 3 is for the company schema 4 is for user apply application schema }