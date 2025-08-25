import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job Id is required.",  //using the 400 when some important field is missing like the id 
                success:false
            });
        }
        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this Job.",
                success:false
            });
        }
        //check if the jobs exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            });
        }
       //create a new application 
       const newApplication = await Application.create({
             job:jobId,
             applicant:userId
       });

       job.applications.push(newApplication._id);  //the number of user applications 
       await job.save();
       return res.status(201).json({
        message:"Job Applied Successfully",
        success:true
       }); 
    } catch (error) {
        console.log(error);
        
    }
}
//getting all the applied jobs here:
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id; //logged in user 
        //finding all the users application who have applied for this job:
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                  path:'company', 
                options:{sort:{createdAt:-1}},
                   }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications Found",
                success:false
            });
        }
         return res.status(200).json({
           application,
           success:true
         });       
    } catch (error) {
        console.log(error);
        
    }
}
//admin sees how many users have applied the job:
export const getApplicants = async (req,res) => {
         try {
           const jobId = req.params.id; //id is the job ID
           const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
           });
           if(!job){
            return res.status(404).json({
                message:"Job Not Found.",
                success:false
            });
           }
           return res.status(200).json({
            job,
            success:true
           })

         } catch (error) {
            console.log(error);
            }   
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId =  req.params.id;         //applicationId since we are updating the Id will also be updated
        if(!status){
            return res.status(400).json({
                message:"Status is Required",
                success:false
            });
        }
        //find the application by applicantion ID
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            });
        }
        //update the status 
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status Updated Successfully",
            success:true
        });

    } catch (error) {
        console.log(error);
        
    }
}
