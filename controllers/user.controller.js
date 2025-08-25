//business logic login user and all
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email }); //checks whether the user already exists with the same user
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);   //converting the password into hash, the 10 is the how strong the password and the letters should be there 

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);

    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });  //checks whether the email is correct and exists
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);  //password matches then it is correct
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false,
            })
        };
        //check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };
        //generating a token
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            //returning the user
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }



        //token stored in cookies, the below is for the security purpose so the hacker cannot hack //1*24*60*60*1000 defines as the 1 day
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true

        })



    } catch (error) {
        console.log(error);

    }
}
export const logout = async (req,res) => {
    try {
         //this means that the token got expired
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        
        //cloudinary comes here 
       //skills are in string format so we are converting into array
       let skillsArray;
        if(skills){
         skillsArray = skills.split(",");
        }
        
        //updating or edting the profile the skills part needs the user authentication so:
        const userId = req.id;  //middleware authentication 
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }
        //updating the data 
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        //resume comes here later

        await user.save();

         user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })

       } catch (error) {
       console.log(error);
    }
}