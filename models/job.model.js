import mongoose from "mongoose"; //database schema 

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{   //skills{array}
        type:[String],
        required:true
    },
    salary:{ 
        type:Number,
        required:true
    },
    experienceLevel:{
      type:Number,
      required:true
    },
    location:{ 
        type:String,
        required:true
    },
    jobType:{ 
        type:String,
        required:true
    },
    position:{     //no of openings
        type:Number,
        required:true
    },
    company:{     //relation between job and the company 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required:true
    },
    created_by:{    
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',   //admin creates
        required:true
    },
    applications:[    
        {
          type:mongoose.Schema.Types.ObjectId,  
          ref: 'Application',
        }
    ]
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);