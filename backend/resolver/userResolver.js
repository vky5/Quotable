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
    return users;
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

const validateJWT = async (_, args) => {
  // we have option to pass token from args from frontend or through header I prefer header but to practice I am going to pass through args
  try {
    let token;

    if (args["authorization"]) {
      token = args["authorization"].split(" ");
    }
  } catch (error) {}
};

export const loginRes = async (_, args) => {
  try {
    const user = await UserModel.findOne({
      email: args.credentials.email,
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
