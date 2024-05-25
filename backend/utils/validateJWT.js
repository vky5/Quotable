const util = require('util');

export const validateJWT = async (req)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        throw new Error('You are not logged in !');
    }

    const verifyToken = util.promisify(jwt.verify);

    const decoded =  await verifyToken(token,  process.env.JWT_SECRET);

    const user = await UserData.findById(decoded.id);

    if (!user){
        throw new Error('User no longer exists');
    }
}