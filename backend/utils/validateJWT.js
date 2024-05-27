import jwt from "jsonwebtoken"

export const validateJWT = async ({req})=>{
    // here we are taking token from the header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    // we are checking if the token exists or not since context should not throw error at any point we are going to handle that in every function
    const decoded =  await jwt.verify(token,  process.env.JWT_SECRET);
    return {
        id: decoded.id
    }    
}