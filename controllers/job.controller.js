import { Job } from "../models/job.model.js";

//admin, that posts the job
export const postJob = async (req,res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
               message:"Something is missing.",
               success:false
            });
        }
        const job = await Job.create({
            title, 
            description, 
            requirements, //the requirements are/need to be in the stack so we are spliting the requirements 
            salary: Number(salary), 
            location, 
            jobType, 
            experienceLevel:experience,
            position, 
            company:companyId,     
            created_by:userId
        });
        return res.status(201).json({
            message:"New Job Created Successfully",
            job, //returning the job
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
//student
export const getAllJobs = async (req,res) => {
       try { //here we have to the filtering{realted to api if we use the keywords}
        const keyword = req.query.keyword || "";
        const query = {
            $or :[
                 {title:{$regex:keyword, $options:"i"}},   //the i means case sensitive
                 {description:{$regex:keyword, $options:"i"}},  
            ]
        };
        const jobs = await Job.find(query).populate({
            //this the object inside here we have to decide what to populate
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                  message:"Jobs not found.",
                  success:false
            });
        }
        return res.status(200).json({
            jobs,
            success:true
        })
       } catch (error) {
        console.log(error);
       }
} //now after the above now finding the job by id:
//the below one is for the students 
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"No Jobs Are Found.",
                success:false
            });
        }
        return res.status(200).json({job, success:true});
      } catch (error) {
        console.log(error);
        
    }
}
//how many jobs did the admin create till now
export const getAdminJobs = async (req,res) => {
    try {
        const adminId =  req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"No Jobs Are Found.",
                success:false
            });
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
    
}
