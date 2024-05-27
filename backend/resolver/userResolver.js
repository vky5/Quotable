import QuoteModel from "../model/quoteModel.js";
import UserModel from "../model/userModel.js"; // wtf if we don't write .js it wont work??
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const addUserRes = async (_, args) => {
  try {
    if (
      await UserModel.findOne({
        email: args.userNew.email,
      })
    ) {
      throw new Error("User already exists with same email");
    }
    const newUser = await UserModel.create(args["userNew"]);
    return {
      user: newUser,
      token: createToken(newUser._id),
    };
  } catch (err) {
    console.log("Error in creating new User: " + err);
  }
};

export const getUsers = async () => {
  try {
    const users = await UserModel.find({});
    return users; // NOTE we don't need to specify from where quote is getting it's data because it is already defined in some place


  } catch (error) {
    console.log("Error in getting all users: " + error);
  }
};

export const getUser = async (_, args) => {
  try {
    const user = await UserModel.findById(args._id);
    return user;
  } catch (error) {
    console.log("Error while getting the user: " + error);
  }
};

export const loginRes = async (_, args) => {
  try {
    const user = await UserModel.findOne({
      email: args.credentials.email, // in schema QL we defined input type as UserInput and we specified that object to key credential
    }).select("+password");
    const isPasswordCorrect = await user.correctPassword(
      args.credentials.password,
      user.password
    );

    if (isPasswordCorrect) {
      return {
        token: createToken(user._id)
      };
    }
  } catch (error) {
    console.log("error: " + error);
  }
};

export const quoteResUser = async (user) =>{
  const quotes = await QuoteModel.aggregate([
    {
      $match: { by: user.email } // Match quotes where 'by' field matches the argument
    },
    {
      $project: { 
        by: 1,
        quote: 1,
        _id: 1
      }
    }
  ]);

  return quotes.map(quot=>{
    return {
      _id: quot._id,
      content: quot.quote,
      by: quot.by
    }
  })
}
