import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res, next) => {
    //next: passes control to next middleware 
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not Authenticated.",
                success:false,
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false,
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated; //middleware
//middleware works between request and response if we request the middleware gives the response
//first the request comes then the middleware checks if right it sends to the controller

