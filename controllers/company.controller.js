import {Company} from "../models/company.model.js";
export const registerCompany = async (req,res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});  //MongoDB query
        if(company){
            return res.status(400).json({
                message:"You can't register in the same company",
                success:false
            });
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        //201 since it is registered or created
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
           
        });


    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req,res) => {
    try {
        //logged in user id 
        const userId = req.id;  //using the userId cause we need the only companies that the user uses not all
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            });
        }
        return res.status(200).json({
            companies,
            success:true
        });
        

    } catch (error) {
        console.log(error);
    }
}
//get company by id
export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
         return res.status(404).json({
                message:"Company not found",
                success:false
            });
        }
        return res.status(200).json({
           company,
           success:true
        });
    } catch (error) {
        console.log(error);
    }
}
//updating company information 
export const updateCompany = async (req,res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        //cloudinary


        const updateData = {name, description, website, location};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true});
         
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            });
        }

        return res.status(200).json({
            message:"Company Information Updated",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}