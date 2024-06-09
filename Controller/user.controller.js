import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  // check if user already exists..  then gest login
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ user: existingUser, token: token });
  }
  const newUser = new User({ email });
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  await newUser.save();
  res.status(201).json({ user: newUser, token: token });
};

 
/// update user name

export const update = async (req, res) => {
  console.log(req.body)
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
 
  res.status(200).json(user);
};

// to get current user

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json(user);
};
