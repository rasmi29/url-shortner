import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

async function userSignup(req, res) {
  //fetch data
  const { name, email, password } = req.body;
  //validate data
  if (!req.body || !name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  //check if user already exist
  let existingUser = await User.findOne({ email });
  //if found
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "user already exist , please login",
    });
  }

  //create user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  //check user is created or not
  if (!newUser) {
    return res.status(500).json({
      success: false,
      message: "Error in user creation, try again",
    });
  }

  //all right send response
  return res.status(201).json({
    success: true,
    message: "user created succesfully",
  });
}

async function userLogin(req, res) {
  //fetch data
  const { email, password } = req.body;
  //validate data
  if (!req.body || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  //check if user exist or not
  let existingUser = await User.findOne({ email, password });
  //if not  found
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "user not found , first register",
    });
  }
  //generate a token
  const token = jwt.sign(
    {
      email: existingUser.email,
    },
    process.env.JWT_SECRET
  );

  if (!token) {
    return res.status(500).json({
      success: false,
      message: "error in token generation",
    });
  }
  //store token in user side

  res.cookie("token",token) ;

  //all right send response
  return res.status(201).json({
    success: true,
    message: "user loggedin succesfully",
  });
}
export { userSignup, userLogin };
