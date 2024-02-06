import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import 'dotenv/config';

declare global{
    namespace Express{
        interface Request{
            userId:string,
        }
    } 
}
const verifyToken = (req:Request,res:Response, next:NextFunction)=>{
    const token = req.cookies["auth_token"];
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET as string);
        req.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Unauthorized"})
    }
}
export default verifyToken;