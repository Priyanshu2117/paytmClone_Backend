import { User, Account } from "../db/db.js";
import bcrypt from "bcrypt";
import { BCRYPT_SALT_VALUE, JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const signUp = async (userData) => {
  const { firstName, lastName, userName, password } = userData;
  //check for existing user
  const existingUser = await User.findOne({
    userName,
  });

  if (existingUser) {
    throw new Error("User already exist");
  }
  //hash the password using bycrypt
  const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_VALUE);

  //save the details in db
  const user = new User({
    firstName,
    lastName,
    userName,
    password: hashedPassword,
  });

  await user.save();
  await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 10000) + 1,
  });

  //return the token with the data
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  return {
    user: {
      id: user._id,
      firstName,
      lastName,
      userName,
    },
    token: token,
  };
};

const signIn = async (userData) => {
  const { userName, password } = userData;

  //check for existing user
  const existingUser = await User.findOne({
    userName,
  });

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  //if(existinguser), compare password with hash
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );
  console.log("isPasswordCorrect", isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new Error("Incorrect Password");
  }

  //generate token, jwt.sign
  const generateToken = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

  //return userdata, token
  return {
    user: {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.userName,
      userId: existingUser._id,
    },
    token: generateToken,
  };
};

const updateUser = async (userData, userId) => {
  if ("password" in userData) {
    const hashedPassword = await bcrypt.hash(
      userData.password,
      BCRYPT_SALT_VALUE,
    );
    userData.password = hashedPassword;
  }
  // const result = await User.updateOne(userData, {_id: userId})
  //here the issue in above one was In Mongoose, updateOne() expects the filter (query) as the first parameter and the update data as the second parameter, but you have them reversed.

  //The correct syntax is:
  //First parameter: filter/query object {_id: userId}
  //Second parameter: update data userData

  const result = await User.updateOne({ _id: userId }, userData);

  if (!result.acknowledged) {
    throw new Error("Update Failed");
  }
};

const fetchUserDetails = async (request) => {
  const filter = request.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  const fetchedUsers = users.map((user) => {
    return {
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    };
  });

  return {
    users: fetchedUsers,
  };
};

export { signUp, signIn, updateUser, fetchUserDetails };
