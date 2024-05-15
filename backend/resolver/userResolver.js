import UserModel from "../model/userModel.js"; // wtf if we don't write .js it wont work??
import jwt from 'jsonwebtoken';

const createToken = id=>{
  return jwt.sign(
    {id}, 
    process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  )
}


export const addUserRes = async (_, args)=>{
    try{
        const newUser = await UserModel.create(args['userNew']);
        return newUser;

    }catch(err){
        console.log('Error in creating new User: ' + err);
    }
}

export const getUsers = async () => {
  try {
    const users = await UserModel.find({}); 
    return users;

  } catch (error) {
    console.log("Error in getting all users: " + error);
  }

};

export const getUser = async (_, args) =>{
  try {
    const user = await UserModel.findById(args._id);
    return user
  } catch (error) {
    console.log('Error while getting the user: ' + error);
  }
}